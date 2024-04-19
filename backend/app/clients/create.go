package clients

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func Create(database interfaces.Database, client entities.Client) (entities.Client, error) {
	err := database.Clients().Create(client)

	if err != nil {
		return entities.Client{}, err
	}

	return client, nil
}
