package sql

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"

	"stock-inventory/config"
	"stock-inventory/database/interfaces"

	brandsStore "stock-inventory/database/sql/stores/brands"
	clientsStore "stock-inventory/database/sql/stores/clients"
	materialsStore "stock-inventory/database/sql/stores/materials"
	productsStore "stock-inventory/database/sql/stores/products"
	usersStore "stock-inventory/database/sql/stores/users"
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
	brandsStore    interfaces.BrandsStore
	clientsStore   interfaces.ClientsStore
	productsStore  interfaces.ProductsStore
	materialsStore interfaces.MaterialsStore
	usersStore     interfaces.UsersStore
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
		brandsStore:    brandsStore.New(connection),
		clientsStore:   clientsStore.New(connection),
		productsStore:  productsStore.New(connection),
		materialsStore: materialsStore.New(connection),
		usersStore:     usersStore.New(connection),
	}, nil
}

func (database *SqlDatabase) Brands() interfaces.BrandsStore {
	return database.brandsStore
}

func (database *SqlDatabase) Clients() interfaces.ClientsStore {
	return database.clientsStore
}

func (database *SqlDatabase) Products() interfaces.ProductsStore {
	return database.productsStore
}

func (database *SqlDatabase) Materials() interfaces.MaterialsStore {
	return database.materialsStore
}

func (database *SqlDatabase) Users() interfaces.UsersStore {
	return database.usersStore
}
