package products

import (
	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindById(database interfaces.Database, id uuid.UUID) (entities.Product, error) {
	product, err := database.Products().FindById(id)

	if err != nil {
		return entities.Product{}, err
	}

	materials, err := database.Materials().FindByProduct(product)

	if err != nil {
		return entities.Product{}, err
	}

	product.Materials = materials

	return product, nil
}
