package memory

import (
	"stock-inventory/database/interfaces"

	brandsStore "stock-inventory/database/memory/stores/brands"
	clientsStore "stock-inventory/database/memory/stores/clients"
	productsStore "stock-inventory/database/memory/stores/products"
	usersStore "stock-inventory/database/memory/stores/users"
)

type MemoryDatabase struct {
	brandsStore    interfaces.BrandsStore
	clientsStore   interfaces.ClientsStore
	productsStore  interfaces.ProductsStore
	materialsStore interfaces.MaterialsStore
	usersStore     interfaces.UsersStore
}

func New() *MemoryDatabase {
	return &MemoryDatabase{
		brandsStore:   brandsStore.New(),
		clientsStore:  clientsStore.New(),
		productsStore: productsStore.New(),
		usersStore:    usersStore.New(),
	}
}

func (database *MemoryDatabase) Brands() interfaces.BrandsStore {
	return database.brandsStore
}

func (database *MemoryDatabase) Clients() interfaces.ClientsStore {
	return database.clientsStore
}

func (database *MemoryDatabase) Products() interfaces.ProductsStore {
	return database.productsStore
}

func (database *MemoryDatabase) Materials() interfaces.MaterialsStore {
	return database.materialsStore
}

func (database *MemoryDatabase) Users() interfaces.UsersStore {
	return database.usersStore
}
