package users

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func Create(database interfaces.Database, newUser entities.User) (entities.User, error) {
	err := database.Users().Create(newUser)

	if err != nil {
		return entities.User{}, err
	}

	return newUser, nil
}
