package sql

import (
	"fmt"
	"stock-inventory/config"
	"stock-inventory/database/interfaces"
	usersStore "stock-inventory/database/sql/stores"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type SqlDatabase struct {
	usersStore interfaces.UsersStore
}

func getPostgresDSN(sqlConfig config.SQLConfig) string {
	dsn := "postgres://"

	if sqlConfig.User != "" {
		dsn += sqlConfig.User
		if sqlConfig.Password != nil {
			dsn += ":" + sqlConfig.Password.(string)
		}
		dsn += "@"
	}

	dsn += fmt.Sprintf("%s:%d/%s?sslmode=disable", sqlConfig.Host, sqlConfig.Port, sqlConfig.Database)

	return dsn
}

func New(sqlConfig config.SQLConfig) (*SqlDatabase, error) {
	dsn := getPostgresDSN(sqlConfig)

	connection, error := sqlx.Open("postgres", dsn)

	if error != nil {
		return &SqlDatabase{}, fmt.Errorf("error opening to database: %v", error)
	}

	if error := connection.Ping(); error != nil {
		return &SqlDatabase{}, fmt.Errorf("error connecting to database: %v", error)
	}

	return &SqlDatabase{
		usersStore: usersStore.New(connection),
	}, nil
}

func (database *SqlDatabase) Users() interfaces.UsersStore {
	return database.usersStore
}
