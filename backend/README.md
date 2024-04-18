[![Deploy](https://github.com/juelvaldivia/tracking/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/juelvaldivia/tracking/actions/workflows/ci.yml)

# GPS Tracking in Go
Welcome to the GPS Tracking project in Go! This project aims to provide a robust and efficient solution for GPS device tracking.

Whether you're building a vehicle tracking system, a fitness application, or any app requiring real-time tracking, this Go project has got you covered.

## Installation

1. Clone the repository to your local machine:

   ```shell
   git clone git@github.com:juelvaldivia/tracking.git
   ```

2. Navigate to the application directory::
   ```shell
   cd tracking
   ```

# Configuration

The behavior of the application is determined by the `config.yml` file, where you can configure the following settings:

- Create the `config.yml` file you can base it on `config-example.yml` you can copy it like this:
    ```shell
    cp config-example.yml config.yml
    ```

- Api Configuration:

  ```yml
  api_port = 5678
  ```

- Database Configuration:

  ```yml
  database_driver = memory|sql
  ```

  if you choose a sql database, configure your environment accordingly
  ```yml
  sql_database:
    host: localhost
    port: 5432
    username: your_username
    password: your_password
    database: your_database
  ```

# Migrations

- This project uses golang migrate you can review the page of [go migrations](https://github.com/golang-migrate/migrate)

- To install [go migrate](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate)

- Mac
```bash
$ brew install golang-migrate
or
$ arch -arm64 brew install golang-migrate
```

- Windows using scoop
```bash
$ scoop install migrate
```

- Linux (*.deb package)
```bash
$ curl -L https://packagecloud.io/golang-migrate/migrate/gpgkey | apt-key add -
$ echo "deb https://packagecloud.io/golang-migrate/migrate/ubuntu/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/migrate.list
$ apt-get update
$ apt-get install -y migrate
```
# Usage

- Build the database using docker
    ```bash
    $ make postgres
    ```

- Build the tracking database and run migrations
    ```bash
    $ make database
    $ make migrate
    ```

- Run the application:
    ```bash
    go run main.go
    ```

- To stop the application, press `Ctrl+C` in the terminal.

# Development Usage

## Lint Usage
- Install [golangci-lint](https://golangci-lint.run/usage/install/) to use
```bash
golangci-lint run
```
or you can use make
```bash
make lint
```
## Tests
- Run test
 ```bash
  go test -v ./tests/...
 ```

 or use make

  ```bash
  make test
 ```

# Acknowledgments

This application was developed by Luis Velazco, Eduardo Valdivia and Joel Valdivia.
