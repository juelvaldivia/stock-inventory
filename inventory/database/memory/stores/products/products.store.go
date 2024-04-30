package productsStore

import (
	"errors"

	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/filters"
	"stock-inventory/database/utils"
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

func (store *ProductStore) FindAll(pagination *utils.Pagination, filters *filters.ProductsFilters) (entities.ProductsList, error) {
	products := make([]entities.Product, 0, len(store.Products))

	for _, product := range store.Products {
		products = append(products, product)
	}

	totalItems := len(products)

	productsList := entities.ProductsList{
		TotalItems:  totalItems,
		TotalPages:  pagination.CalculateTotalPages(totalItems),
		CurrentPage: pagination.Page,
		PerPage:     pagination.PerPage,
		Items:       products,
	}

	return productsList, nil
}

func (store *ProductStore) Create(product entities.Product) (entities.Product, error) {
	newProduct := product

	store.Products[product.Id.String()] = newProduct

	return newProduct, nil
}

func (store *ProductStore) FindById(id uuid.UUID) (entities.Product, error) {
	if product, exists := store.Products[id.String()]; exists {
		return product, nil
	}

	return entities.Product{}, ErrProductNotFound
}
