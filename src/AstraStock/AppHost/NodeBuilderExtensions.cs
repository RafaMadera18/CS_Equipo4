namespace AstraStock.AppHost;

using AstraStock.Shared.Net;

internal static class NodeBuilderExtensions
{
    private const string DefaultScriptName = "start";

    public static IResourceBuilder<NodeAppResource> AddNpmAppWithRandomPort(
        this IDistributedApplicationBuilder builder,
        string name,
        string workingDirectory,
        string scriptName = DefaultScriptName,
        string[]? args = null)
    {
        int randPort = PortFinder.GetAvailablePort();
        return builder.AddNpmAppWithPort(name, randPort, workingDirectory, scriptName, args);
    }

    public static IResourceBuilder<NodeAppResource> AddNpmAppWithPort(
        this IDistributedApplicationBuilder builder,
        string name,
        int port,
        string workingDirectory,
        string scriptName = DefaultScriptName,
        string[]? args = null)
    {
        string[]? allArgs = [$"--port={port}", .. args ?? []];
        return builder.AddNpmApp(name, workingDirectory, scriptName, allArgs)
            .WithHttpEndpoint(targetPort: port);
    }
}
