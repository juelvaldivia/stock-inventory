package interfaces

import (
	"stock-inventory/app/entities"

	"github.com/google/uuid"
)

type UsersStore interface {
	All() ([]entities.User, error)
	Create(user entities.User) error
	FindById(id uuid.UUID) (entities.User, error)
}

type ProductsStore interface {
	FindAll() ([]entities.Product, error)
	Create(product entities.Product) error
	FindById(id uuid.UUID) (entities.Product, error)
}

type Database interface {
	Users() UsersStore
	Products() ProductsStore
}
