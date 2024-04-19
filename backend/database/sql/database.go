package sql

import (
	"fmt"
	"stock-inventory/config"
	"stock-inventory/database/interfaces"
	productsStore "stock-inventory/database/sql/stores/products"
	usersStore "stock-inventory/database/sql/stores/users"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

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

type SqlDatabase struct {
	usersStore    interfaces.UsersStore
	productsStore interfaces.ProductsStore
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
		usersStore:    usersStore.New(connection),
		productsStore: productsStore.New(connection),
	}, nil
}

func (database *SqlDatabase) Users() interfaces.UsersStore {
	return database.usersStore
}

func (database *SqlDatabase) Products() interfaces.ProductsStore {
	return database.productsStore
}
