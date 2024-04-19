package usersStore

import (
	"errors"

	"github.com/google/uuid"

	"stock-inventory/app/entities"
)

var ErrUserNotFound = errors.New("user not found")

type UsersStore struct {
	Users map[string]entities.User
}

func New() *UsersStore {
	return &UsersStore{
		Users: make(map[string]entities.User),
	}
}

func (store *UsersStore) All() ([]entities.User, error) {
	usersList := make([]entities.User, 0, len(store.Users))

	for _, user := range store.Users {
		usersList = append(usersList, user)
	}

	return usersList, nil
}

func (store *UsersStore) Create(user entities.User) error {
	store.Users[user.Id.String()] = user
	return nil
}

func (store *UsersStore) FindById(id uuid.UUID) (entities.User, error) {
	if user, exists := store.Users[id.String()]; exists {
		return user, nil
	}

	return entities.User{}, ErrUserNotFound
}
