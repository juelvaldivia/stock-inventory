package products

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func Create(database interfaces.Database, product entities.Product) (entities.Product, error) {
	newProduct, err := database.Products().Create(product)

	if err != nil {
		return entities.Product{}, err
	}

	for _, material := range product.Materials {
		errors := database.Products().AssignMaterial(newProduct, material, material.QuantityUsed)

		if errors != nil {
			return entities.Product{}, errors
		}
	}

	materials, err := database.Materials().FindByProduct(newProduct)
	if err != nil {
		return entities.Product{}, err
	}

	newProduct.Materials = materials

	return newProduct, nil
}
