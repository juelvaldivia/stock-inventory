package brands

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindAll(database interfaces.Database) ([]entities.Brand, error) {
	return database.Brands().FindAll()
}
