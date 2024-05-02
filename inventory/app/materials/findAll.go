package materials

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/filters"
	"stock-inventory/database/interfaces"
	"stock-inventory/database/utils"
)

func FindAll(
	database interfaces.Database,
	page int,
	perPage int,
	filters *filters.MaterialsFilters,
) (entities.MaterialsList, error) {
	pagination := utils.NewPagination(page, perPage)

	return database.Materials().FindAll(pagination, filters)
}
