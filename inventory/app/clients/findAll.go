package clients

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindAll(database interfaces.Database) ([]entities.Client, error) {
	return database.Clients().FindAll()
}
