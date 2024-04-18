package memory

import (
	"stock-inventory/database/interfaces"
	usersStore "stock-inventory/database/memory/stores"
)

type MemoryDatabase struct {
	usersStore interfaces.UsersStore
}

func New() *MemoryDatabase {
	return &MemoryDatabase{
		usersStore: usersStore.New(),
	}
}

func (database *MemoryDatabase) Users() interfaces.UsersStore {
	return database.usersStore
}
