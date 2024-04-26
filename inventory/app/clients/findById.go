package clients

import (
	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindById(database interfaces.Database, id uuid.UUID) (entities.Client, error) {
	client, err := database.Clients().FindById(id)

	if err != nil {
		return entities.Client{}, err
	}

	return client, nil
}
