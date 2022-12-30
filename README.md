# Event Manager App

A centralized app that can manage all types of events


## Tech

This repo used some packages like:

- [Next.js] -For Frontend, which handles MPA
- [Typescript] - To support type safety on top of the Next.js framework
- [C#] - For Backend, which handled and transform data
- [Entity Framework Core] - ORM that runs with C# (Backend)
- [Postgres] - Database
- [Styled Components] - Package for styling the frontend
- [react-icons] - Package for providing icons on the frontend


## Installation
This Project requires :
- [Node.js](https://nodejs.org/)
- [C# .NET CORE](https://dotnet.microsoft.com/en-us/download)
- [Docker & Docker Compose](https://docs.docker.com/compose/)

### For Client
Note: Provide a `.env.local` on the root directory of the `client` folder, with a content like this:
```
NEXT_PUBLIC_SERVER=http://localhost:5243
```

Install the dependencies and start the client.

```sh
npm i
npm run dev
```

### For Server
Note: Provide a `appsettings.Development.json` on the root directory of the `server` folder, with a content like this:
```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DB": "Host=localhost:5432;Database=events_db;Username=admin;Password=root"
  },
  "Authentication": {
    "SecretForKey": "L[S18I}'J&2>&YC(b%~*kOnFvLHv+]vI-sv%!1gpY}8GZ0]NMY%HJMh@vAEjy;Q",
    "Issuer": "http://localhost:5243",
    "Audience": "you_hehe"
  },
  "ClientURL": "http://localhost:3000/"
}

```

Install the dependencies and start the `server`.

```sh
dotnet restore
dotnet run
```



[//]: # (links)

   [Next.js]: <https://nextjs.org/>
   [Typescript]: <https://www.typescriptlang.org/>
   [C#]: <https://en.wikipedia.org/wiki/C_Sharp_(programming_language)>
   [Entity Framework Core]: <https://learn.microsoft.com/en-us/ef/core/>
   [Postgres]: <https://www.postgresql.org/>
   [Styled Components]: <https://styled-components.com/>
   [react-icons]: <https://react-icons.github.io/react-icons/>

