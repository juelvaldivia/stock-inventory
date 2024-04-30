package products

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/filters"
	"stock-inventory/database/interfaces"
	"stock-inventory/database/utils"
)

func FindAll(database interfaces.Database, page int, perPage int, filters *filters.ProductsFilters) (entities.ProductsList, error) {
	pagination := utils.NewPagination(page, perPage)

	return database.Products().FindAll(pagination, filters)
}
