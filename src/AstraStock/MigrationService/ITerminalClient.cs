namespace AstraStock.MigrationService;

public interface ITerminalClient
{
    Task ReceiveLine(string line);

    Task EndOfResponse();
}
