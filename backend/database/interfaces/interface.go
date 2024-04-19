package interfaces

import (
	"github.com/google/uuid"

	"stock-inventory/app/entities"
)

type BrandsStore interface {
	FindAll() ([]entities.Brand, error)
	Create(brand entities.Brand) error
	FindById(id uuid.UUID) (entities.Brand, error)
}

type ClientsStore interface {
	FindAll() ([]entities.Client, error)
	Create(client entities.Client) error
	FindById(id uuid.UUID) (entities.Client, error)
}

type ProductsStore interface {
	FindAll() ([]entities.Product, error)
	Create(product entities.Product) error
	FindById(id uuid.UUID) (entities.Product, error)
}

type UsersStore interface {
	All() ([]entities.User, error)
	Create(user entities.User) error
	FindById(id uuid.UUID) (entities.User, error)
}

type Database interface {
	Brands() BrandsStore
	Clients() ClientsStore
	Products() ProductsStore
	Users() UsersStore
}
