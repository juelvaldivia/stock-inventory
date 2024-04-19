package clientsStore

import (
	"errors"

	"github.com/google/uuid"

	"stock-inventory/app/entities"
)

var ErrClientNotFound = errors.New("client not found")

type ClientStore struct {
	Clients map[string]entities.Client
}

func New() *ClientStore {
	return &ClientStore{
		Clients: make(map[string]entities.Client),
	}
}

func (store *ClientStore) FindAll() ([]entities.Client, error) {
	clients := make([]entities.Client, 0, len(store.Clients))

	for _, client := range store.Clients {
		clients = append(clients, client)
	}

	return clients, nil
}

func (store *ClientStore) Create(client entities.Client) error {
	store.Clients[client.Id.String()] = client
	return nil
}

func (store *ClientStore) FindById(id uuid.UUID) (entities.Client, error) {
	if client, exists := store.Clients[id.String()]; exists {
		return client, nil
	}

	return entities.Client{}, ErrClientNotFound
}
