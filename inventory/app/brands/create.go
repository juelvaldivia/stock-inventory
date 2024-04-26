package brands

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func Create(database interfaces.Database, brand entities.Brand) (entities.Brand, error) {
	err := database.Brands().Create(brand)

	if err != nil {
		return entities.Brand{}, err
	}

	return brand, nil
}
