FROM golang:1.22

RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN go install github.com/githubnemo/CompileDaemon@latest

WORKDIR /var/lib/app/

COPY go.mod go.sum ./
RUN go mod download

COPY . /var/lib/app/
COPY ./dockerfiles/dev/config.yml /var/lib/scripts/config.yml
COPY ./dockerfiles/dev/scripts/ /var/lib/scripts/

RUN chmod +x /var/lib/scripts/startup.sh

CMD ["/var/lib/scripts/startup.sh"]

