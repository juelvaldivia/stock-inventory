package memory

import (
	"stock-inventory/database/interfaces"
	productsStore "stock-inventory/database/memory/stores/products"
	usersStore "stock-inventory/database/memory/stores/users"
)

type MemoryDatabase struct {
	usersStore    interfaces.UsersStore
	productsStore interfaces.ProductsStore
}

func New() *MemoryDatabase {
	return &MemoryDatabase{
		usersStore:    usersStore.New(),
		productsStore: productsStore.New(),
	}
}

func (database *MemoryDatabase) Users() interfaces.UsersStore {
	return database.usersStore
}

func (database *MemoryDatabase) Products() interfaces.ProductsStore {
	return database.productsStore
}
