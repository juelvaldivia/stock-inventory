package memory

import (
	"stock-inventory/database/interfaces"

	brandsStore "stock-inventory/database/memory/stores/brands"
	productsStore "stock-inventory/database/memory/stores/products"
	usersStore "stock-inventory/database/memory/stores/users"
)

type MemoryDatabase struct {
	usersStore    interfaces.UsersStore
	productsStore interfaces.ProductsStore
	brandsStore   interfaces.BrandsStore
}

func New() *MemoryDatabase {
	return &MemoryDatabase{
		brandsStore:   brandsStore.New(),
		productsStore: productsStore.New(),
		usersStore:    usersStore.New(),
	}
}

func (database *MemoryDatabase) Brands() interfaces.BrandsStore {
	return database.brandsStore
}

func (database *MemoryDatabase) Products() interfaces.ProductsStore {
	return database.productsStore
}

func (database *MemoryDatabase) Users() interfaces.UsersStore {
	return database.usersStore
}
