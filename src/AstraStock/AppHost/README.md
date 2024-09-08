# AppHost

## Run

```bash
dotnet run
```

> [!WARNING]
> Database persistence disabled by default. See [DB_PERSISTENCE](#configuration-variables).

## Modules

```mermaid
graph LR
    style host-s stroke-width:0,fill:transparent
    style AppHost fill:#a546be
    style ApiService fill:#a546be
    style MigrationService fill:#a546be
    style MigrationClient fill:#de002d
    style WebApp fill:#de002d
    style db fill:#4e92e6
    style pg1 fill:#4e92e6
    style pg2 fill:#4e92e6

    subgraph host-s[ ]
    AppHost
    end

    subgraph App
    AppHost --> ApiService
    AppHost --> WebApp
    end

    subgraph Migration
    AppHost --> MigrationService
    AppHost --> MigrationClient
    end

    subgraph Database
    AppHost --> db[(PostgreSQL)]
    AppHost --> pg1[[pgAdmin]]
    AppHost --> pg2[[pgWeb]]
    end
```

## Modes

**Default:** App.

---

- ### App

```mermaid
graph TD
    style AppHost fill:#a546be
    style ApiService fill:#a546be
    style Database fill:#a546be
    style ServiceDefaults fill:#a546be
    style WebApp fill:#de002d
    style db fill:#4e92e6

    AppHost -.-> WebApp
    AppHost -.-> ApiService
    ApiService --> Database
    ApiService --> ServiceDefaults
    WebApp <-.->|http| ApiService
    Database <-.->|tcp| db[(PostgreSQL)]
```

---

- ### Migration

```mermaid
graph TD
    style AppHost fill:#a546be
    style MigrationService fill:#a546be
    style MigrationClient fill:#de002d
    style Database fill:#a546be
    style ServiceDefaults fill:#a546be
    style db fill:#4e92e6
    
    AppHost -.-> MigrationService
    MigrationService --> ServiceDefaults
    MigrationService <-.->|http| MigrationClient
    MigrationService <-.->|EF tools| Database
    Database <-.->|tcp| db[(PostgreSQL)]
```

## Configuration variables

> ### DB_MIGRATION ( bool | false )
>
> - Enables migration mode.
> - Enables database persistence.
> - [EF commands](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/?source=recommendations&tabs=dotnet-core-cli) can be send from MigrationClient.

&#32;

> ### DB_PERSISTENCE ( bool | false )
>
> - Enables database persistence.
> - In [App mode](#app), database must be previously created/updated in [Migration mode](#migration).
