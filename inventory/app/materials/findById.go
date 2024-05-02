package materials

import (
	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindById(database interfaces.Database, id uuid.UUID) (entities.Material, error) {
	material, err := database.Materials().FindById(id)

	if err != nil {
		return entities.Material{}, err
	}

	return material, nil
}
