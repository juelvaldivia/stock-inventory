package productsStore

import (
	"errors"

	"stock-inventory/app/entities"

	"github.com/google/uuid"
)

var ErrProductNotFound = errors.New("product not found")

type ProductStore struct {
	Products map[string]entities.Product
}

func New() *ProductStore {
	return &ProductStore{
		Products: make(map[string]entities.Product),
	}
}

func (store *ProductStore) FindAll() ([]entities.Product, error) {
	products := make([]entities.Product, 0, len(store.Products))

	for _, product := range store.Products {
		products = append(products, product)
	}

	return products, nil
}

func (store *ProductStore) Create(product entities.Product) error {
	store.Products[product.Id.String()] = product
	return nil
}

func (store *ProductStore) FindById(id uuid.UUID) (entities.Product, error) {
	if product, exists := store.Products[id.String()]; exists {
		return product, nil
	}

	return entities.Product{}, ErrProductNotFound
}
