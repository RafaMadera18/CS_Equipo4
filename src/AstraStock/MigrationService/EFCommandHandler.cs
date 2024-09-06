namespace AstraStock.MigrationService;

using CliWrap;
using CliWrap.Buffered;
using CliWrap.Exceptions;

public static class EFCommandHandler
{
    public static async Task Execute(string command, string project, PipeTarget outputPipe)
    {
        try
        {
            await Cli.Wrap("dotnet")
                .WithArguments($"ef {command} --project \"{project}\" --startup-project \"{project}\"")
                .WithStandardOutputPipe(outputPipe)
                .ExecuteBufferedAsync();
        }
        catch (CommandExecutionException ex) when (ex.ExitCode == 1)
        {
            // Ignore exit code 1
        }
    }
}
