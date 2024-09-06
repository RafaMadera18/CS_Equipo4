import { TerminalEmulator } from './TerminalEmulator';
import * as signalR from "@microsoft/signalr";

const serverUrl = process.env.SERVER_URL;

if (!serverUrl) {
  throw new Error("SERVER_URL not defined");
}

console.log("Server url: " + serverUrl);

const terminal = new TerminalEmulator(document.getElementById('terminal')!, "dotnet ef ");

window.addEventListener('resize', () => terminal.fit());

terminal.writeLine("- Migration service -");

const hub = new signalR.HubConnectionBuilder()
  .withUrl(serverUrl + "/terminal")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

hub.on("ReceiveLine", (line: string) => {
  terminal.writeLine(line);
});

let resolveEndOfResponse: (() => void) | null = null;

const createEndOfResponsePromise = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    resolveEndOfResponse = resolve;
  });
};

hub.on("EndOfResponse", () => {
  if (resolveEndOfResponse) {
    resolveEndOfResponse();
    resolveEndOfResponse = null;
  }
});

await hub.start();

await createEndOfResponsePromise();

while (true) {
  const command: string = await terminal.prompt();
  terminal.newLine();

  const endOfResponsePromise = createEndOfResponsePromise();

  await hub.invoke("ReceiveCommand", command);

  await endOfResponsePromise;
}
