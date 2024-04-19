package brands

import (
	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindById(database interfaces.Database, id uuid.UUID) (entities.Brand, error) {
	brand, err := database.Brands().FindById(id)

	if err != nil {
		return entities.Brand{}, err
	}

	return brand, nil
}
