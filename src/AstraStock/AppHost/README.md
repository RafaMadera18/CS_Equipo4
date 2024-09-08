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
    AppHost --> pg2[[pgweb]]
    end
```

## Modes

**Default:** App.

**Base services:** [PostgreSQL](https://www.postgresql.org/), [pgAdmin](https://www.pgadmin.org/) & [pgweb](https://sosedoff.github.io/pgweb/) containers.

---

- ### App

  - The ApiService and WebApp are also started.

&#32;

> [!IMPORTANT]
> If [DB_PERSISTENCE](#configuration-variables) is enabled, database must be previously created/updated in [Migration mode](#migration).

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

  - MigrationService and MigrationClient are also started to allow management of database schema changes.
  - [EF commands](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/?source=recommendations&tabs=dotnet-core-cli) can be sent from MigrationClient.

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

| Variable           | Type  | Default | Description |
|:------------------:|:-----:|:-------:|-------------|
| **DB_MIGRATION**   | bool  | false   | - Enables [Migration mode](#migration).<br> - Enables database persistence. |
| **DB_PERSISTENCE** | bool  | false   | - Enables database persistence.<br> - If enabled and in [App mode](#app), database must be previously created/updated in [Migration mode](#migration).<br> - If disabled a new database is created each time the app is run, and the data is lost along with the database container. |
