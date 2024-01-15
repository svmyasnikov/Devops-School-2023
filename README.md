Course project of DevOps school
- [Build backend application](https://github.com/tdevopsschool/course-project#build-backend-application)
- [Build frontend application](https://github.com/tdevopsschool/course-project#build-frontend-application)

# Build backend application

## Preconditions

List of required tools:
<ul>
    <li>PostgreSQL 13</li>
    <li>Gradle v6.7.1 or gradlew</li>
    <li>Java 8</li>
</ul>

Check the workspace preparation [README](https://github.com/tdevopsschool/.github/tree/main/Workspace-Preparation) file on how to install them.

## DB instance creation

Before building the application you need to create a DB instance.

⚠️ In CentsOS 7 you need to execute `sudo -u postgres -i` before continuing.

```bash
psql postgres
CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres';
```

If user `postgres` exists -- execute `ALTER USER postgres WITH PASSWORD 'postgres';`

```bash
ALTER ROLE postgres CREATEDB;
\du # To check users
\q # Exit
psql postgres -U postgres
CREATE DATABASE devschool;
\l # To check created DB instance
\q # Exit
```

*Source - https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb*

### DB connection configuration

PostgreSQL database should be installed and deployed.<br>
Database connection should be configured inside [application.yaml](backend/src/main/resources/application.yaml):

```yaml
spring:
  datasource:
    url: <connection url>
    driverClassName: org.postgresql.Driver
    username: <database user name>
    password: <database password>
```

## Build

Use gradle inside root folder for app build.

```bash
cd backend
./gradlew build
```

## Deploy

By default deployable JAR file can be found in

```bash
backend/build/libs
```

Simple deploy can be done by java jar command.

```bash
java -jar dev-school-app-1.0-SNAPSHOT.jar
```

Or to start the app in background

```bash
java -jar dev-school-app-1.0-SNAPSHOT.jar & 
```

Useful links:

* Swagger API: http://localhost:8080/swagger-ui.html
* Swagger DOCS: https://swagger.io/docs/


# Build frontend application

## Preconditions

List of required tools:
<ul>
    <li>Node.js v14.15.0</li>
    <li>Yarn v1.22.11</li>
    <li>Gradle v6.7.1 or gradlew</li>
    <li>Java 8</li>
</ul>

## Build

Use gradle inside root folder for app build.

```bash
cd frontend
./gradlew jar
```

## Deploy

By default deployable JAR file can be found in

```bash
frontend/devschool-front-app-server/build/libs
```

Simple deploy can be done by java jar command.

```bash
java -jar devschool-front-app-server-1.0.0.jar
```
Possible deploy flags:

```bash
-port=<port> port of application deploy
-P:ktor.backend.port=<port> port of backend application
-P:ktor.backend.host=<host> address of backend application     
-P:ktor.backend.schema=<schema> schema of backend application   
```

Address of the start page is `./dev-ops-school/index.html`

Example:
- http://localhost/dev-ops-school/index.html

