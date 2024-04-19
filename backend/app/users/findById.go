package users

import (
	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindUserById(database interfaces.Database, id uuid.UUID) (entities.User, error) {
	user, err := database.Users().FindById(id)

	if err != nil {
		return entities.User{}, err
	}

	return user, nil
}
