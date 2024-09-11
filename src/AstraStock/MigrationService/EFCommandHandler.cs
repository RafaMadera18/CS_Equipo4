namespace AstraStock.MigrationService;

using CliWrap;
using CliWrap.Buffered;
using CliWrap.Builders;
using CliWrap.Exceptions;

internal class EFCommandHandler(IEnumerable<string> args)
{
    private readonly SemaphoreSlim semaphore = new(initialCount: 1, maxCount: 1);

    private readonly string args = CreateArgs(args);

    public EFCommandHandler(params string[] args)
        : this((IEnumerable<string>)args)
    {
    }

    public bool ExecutingCommand => this.semaphore.CurrentCount == 0;

    public async Task Execute(string command, PipeTarget outputPipe, Action? onCommandExecuting)
    {
        await this.semaphore.WaitAsync();

        onCommandExecuting?.Invoke();

        try
        {
            await Cli.Wrap("dotnet")
                .WithArguments($"tool run dotnet-ef {command} {this.args}")
                .WithStandardOutputPipe(outputPipe)
                .ExecuteBufferedAsync();
        }
        catch (CommandExecutionException ex) when (ex.ExitCode == 1)
        {
            // Ignore exit code 1
        }
        finally
        {
            this.semaphore.Release();
        }
    }

    private static string CreateArgs(IEnumerable<string> args)
    {
        var builder = new ArgumentsBuilder();
        builder.Add(args);
        return builder.Build();
    }
}
