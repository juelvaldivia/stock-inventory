package products

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func Create(database interfaces.Database, product entities.Product) (entities.Product, error) {
	err := database.Products().Create(product)

	if err != nil {
		return entities.Product{}, err
	}

	return product, nil
}
