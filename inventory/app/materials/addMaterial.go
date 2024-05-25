package materials

import (
	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func AddMaterial(database interfaces.Database, id uuid.UUID, quantity int) (entities.Material, error) {
	material, err := database.Materials().FindById(id)

	if err != nil {
		return entities.Material{}, err
	}

	newQuantity := material.QuantityAvailable + quantity

	_, errUpdateMaterialQuantity := database.Materials().UpdateQuantityAvailable(
		material,
		newQuantity,
	)

	if errUpdateMaterialQuantity != nil {
		return entities.Material{}, errUpdateMaterialQuantity
	}

	materialUpdated, err := database.Materials().FindById(id)

	if err != nil {
		return entities.Material{}, err
	}

	return materialUpdated, nil
}
