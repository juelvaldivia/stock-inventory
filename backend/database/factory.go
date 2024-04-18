package database

import (
	"errors"
	"fmt"

	"stock-inventory/config"
	"stock-inventory/database/interfaces"
	"stock-inventory/database/memory"
	"stock-inventory/database/sql"
)

var UnsupportedDatabase = errors.New("unsupported database type")
var SqlConnectionFails = errors.New("sql connection fails")

type Factory struct {
	Config config.Config
}

func NewFactory(configuration config.Config) *Factory {
	return &Factory{
		Config: configuration,
	}
}

func (factory *Factory) BuildDatabase() (interfaces.Database, error) {
	driver := factory.Config.DatabaseDriver

	var database interfaces.Database

	switch driver {
	case "memory":
		database = memory.New()
	case "sql":
		sqlConfig := factory.Config.SQLDatabase
		database, err := sql.New(sqlConfig)

		if err != nil {
			return nil, fmt.Errorf("%w: %s", SqlConnectionFails, err)
		}

		return database, nil
	default:
		return nil, fmt.Errorf("%w", driver)
	}

	return database, nil
}
