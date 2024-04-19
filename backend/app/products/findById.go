package products

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"

	"github.com/google/uuid"
)

func FindById(database interfaces.Database, id uuid.UUID) (entities.Product, error) {
	user, err := database.Products().FindById(id)

	if err != nil {
		return entities.Product{}, err
	}

	return user, nil
}
