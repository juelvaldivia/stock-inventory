package products

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/filters"
	"stock-inventory/database/interfaces"
	"stock-inventory/database/utils"
	fileRepository "stock-inventory/files"
)

func FindAll(
	database interfaces.Database,
	fileRepository fileRepository.FileRepositoryInterface,
	page int,
	perPage int,
	filters *filters.ProductsFilters,
) (entities.ProductsList, error) {
	pagination := utils.NewPagination(page, perPage)

	productsList, err := database.Products().FindAll(pagination, filters)
	if err != nil {
		return entities.ProductsList{}, err
	}

	for index, product := range productsList.Items {
		if product.ImageUri != "" {
			imageURL, err := fileRepository.URLFromURI("http://localhost:4321", product.ImageUri)
			if err != nil {
				return entities.ProductsList{}, err
			}

			productsList.Items[index].ImageUrl = imageURL
		}

		materials, err := database.Materials().FindByProduct(product)
		if err != nil {
			return entities.ProductsList{}, err
		}

		productsList.Items[index].Materials = materials
	}

	return productsList, nil
}
