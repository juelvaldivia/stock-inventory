package products

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindAll(database interfaces.Database) ([]entities.Product, error) {
	return database.Products().FindAll()
}
