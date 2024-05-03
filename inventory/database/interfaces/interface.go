package interfaces

import (
	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/filters"
	"stock-inventory/database/utils"
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
	FindAll(pagination *utils.Pagination, filters *filters.ProductsFilters) (entities.ProductsList, error)
	Create(product entities.Product) (entities.Product, error)
	FindById(id uuid.UUID) (entities.Product, error)
	UpdateStockQuantity(product entities.Product, quantity int) (entities.Product, error)
	AssignMaterial(product entities.Product, material entities.Material, quantityUsed int) error
	UpdateImage(product entities.Product, imageUri string) error
}

type MaterialsStore interface {
	FindAll(pagination *utils.Pagination, filters *filters.MaterialsFilters) (entities.MaterialsList, error)
	Create(material entities.Material) (entities.Material, error)
	FindById(id uuid.UUID) (entities.Material, error)
	FindByProduct(product entities.Product) ([]entities.Material, error)
	UpdateQuantityAvailable(material entities.Material, quantity int) (entities.Material, error)
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
	Materials() MaterialsStore
	Users() UsersStore
}
