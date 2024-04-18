#!/bin/sh

export PGUSER=$DATABASE_USER
export PGPASSWORD=$DATABASE_PASSWORD
export PGHOST=$DATABASE_HOST
export PGPORT=$DATABASE_PORT
export CONFIG_FILE_PATH=$CONFIG_FILE_PATH

until psql -c '\q'; do
  echo "Postgres is unavailable - waiting..."
  sleep 1
done

echo "Postgres is ready"

if !(psql -lqt | cut -d \| -f 1 | grep -qw $DATABASE_NAME); then
  echo "Creating database $DATABASE_NAME"

  createdb $DATABASE_NAME
fi

echo "Running migrations..."
migrate -path db/migrations \
					-database postgres://$DATABASE_USER:$DATABASE_PASSWORD@$DATABASE_HOST:$DATABASE_PORT/$DATABASE_NAME?sslmode=disable up
echo "Running migrations... Done!"

echo "Starting app..."
CompileDaemon -build="go build -o main ." -directory="." -command="./main"
echo "Starting app... Done!"
