namespace AstraStock.MigrationService;

using AstraStock.Shared.Extensions.Configuration;

using CliWrap;

using Microsoft.AspNetCore.SignalR;

public class TerminalHub(IConfiguration configuration) : Hub<ITerminalClient>
{
    private static SemaphoreSlim Semaphore { get; } = new(1, 1);

    private string Project { get; } = configuration.GetRequired("db-project");

    public override async Task OnConnectedAsync()
    {
        var caller = this.Clients.Caller;

        await caller.ReceiveLine("Connected to server");
        await this.ExecuteAndSendCommandResult(caller, string.Empty);
    }

    public Task ReceiveCommand(string command)
    {
        return this.ExecuteAndSendCommandResult(this.Clients.Caller, command);
    }

    private async Task ExecuteAndSendCommandResult(ITerminalClient client, string command)
    {
        await Semaphore.WaitAsync();

        try
        {
            await EFCommandHandler.Execute(
                command,
                this.Project,
                PipeTarget.ToDelegate(client.ReceiveLine));
        }
        finally
        {
            await client.EndOfResponse();
            Semaphore.Release();
        }
    }
}
