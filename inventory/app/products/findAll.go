package products

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
	"stock-inventory/database/utils"
)

func FindAll(database interfaces.Database, page int, perPage int) (entities.ProductsList, error) {
	pagination := utils.NewPagination(page, perPage)

	return database.Products().FindAll(pagination)
}
