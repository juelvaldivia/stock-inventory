package users

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func FindAll(database interfaces.Database) ([]entities.User, error) {
	return database.Users().All()
}
