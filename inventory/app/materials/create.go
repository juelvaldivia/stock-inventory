package materials

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func Create(database interfaces.Database, material entities.Material) (entities.Material, error) {
	newMaterial, err := database.Materials().Create(material)

	if err != nil {
		return entities.Material{}, err
	}

	return newMaterial, nil
}
