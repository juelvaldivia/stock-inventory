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

ENV PGUSER=$DATABASE_USER
ENV PGPASSWORD=$DATABASE_PASSWORD
ENV PGHOST=$DATABASE_HOST
ENV PGPORT=$DATABASE_PORT
ENV CONFIG_FILE_PATH=$CONFIG_FILE_PATH

CMD /bin/sh -c "\
  until psql -c '\q'; do \
    echo 'Postgres is unavailable - waiting...'; \
    sleep 1; \
  done; \
  echo 'Postgres is ready'; \
  if !(psql -lqt | cut -d \| -f 1 | grep -qw $DATABASE_NAME); then \
    echo 'Creating database $DATABASE_NAME'; \
    createdb $DATABASE_NAME; \
  fi; \
  echo 'Running migrations...'; \
  migrate -path db/migrations -database postgres://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$DATABASE_NAME?sslmode=disable up; \
  echo 'Running migrations... Done!'; \
  echo 'Starting app...'; \
  CompileDaemon -build='go build -o main .' -directory='.' -command='./main'; \
  echo 'Starting app... Done!' \
"

