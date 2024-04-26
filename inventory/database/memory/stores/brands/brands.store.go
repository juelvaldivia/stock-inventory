package brandsStore

import (
	"errors"

	"github.com/google/uuid"

	"stock-inventory/app/entities"
)

var ErrBrandNotFound = errors.New("brand not found")

type BrandStore struct {
	Brands map[string]entities.Brand
}

func New() *BrandStore {
	return &BrandStore{
		Brands: make(map[string]entities.Brand),
	}
}

func (store *BrandStore) FindAll() ([]entities.Brand, error) {
	brands := make([]entities.Brand, 0, len(store.Brands))

	for _, brand := range store.Brands {
		brands = append(brands, brand)
	}

	return brands, nil
}

func (store *BrandStore) Create(brand entities.Brand) error {
	store.Brands[brand.Id.String()] = brand
	return nil
}

func (store *BrandStore) FindById(id uuid.UUID) (entities.Brand, error) {
	if brand, exists := store.Brands[id.String()]; exists {
		return brand, nil
	}

	return entities.Brand{}, ErrBrandNotFound
}
