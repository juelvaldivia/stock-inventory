package materialsStore

import (
	"errors"

	"github.com/google/uuid"

	"stock-inventory/app/entities"
	"stock-inventory/database/filters"
	"stock-inventory/database/utils"
)

var ErrMaterialNotFound = errors.New("material not found")

type MaterialStore struct {
	Materials map[string]entities.Material
}

func New() *MaterialStore {
	return &MaterialStore{
		Materials: make(map[string]entities.Material),
	}
}

func (store *MaterialStore) FindAll(
	pagination *utils.Pagination,
	filters *filters.MaterialsFilters,
) (entities.MaterialsList, error) {
	materials := make([]entities.Material, 0, len(store.Materials))

	for _, material := range store.Materials {
		materials = append(materials, material)
	}

	totalItems := len(materials)

	materialsList := entities.MaterialsList{
		TotalItems:  totalItems,
		TotalPages:  pagination.CalculateTotalPages(totalItems),
		CurrentPage: pagination.Page,
		PerPage:     pagination.PerPage,
		Items:       materials,
	}

	return materialsList, nil
}

func (store *MaterialStore) Create(material entities.Material) (entities.Material, error) {
	newMaterial := material

	store.Materials[material.Id.String()] = newMaterial

	return newMaterial, nil
}

func (store *MaterialStore) FindById(id uuid.UUID) (entities.Material, error) {
	if material, exists := store.Materials[id.String()]; exists {
		return material, nil
	}

	return entities.Material{}, ErrMaterialNotFound
}

func (store *MaterialStore) UpdateStockQuantity(
	material entities.Material,
	newQuantity int,
) (entities.Material, error) {
	// Implement updateStockQuantity

	return entities.Material{}, ErrMaterialNotFound
}

func (store *MaterialStore) FindByProduct(product entities.Product) ([]entities.Material, error) {
	// Implement updateStockQuantity

	return []entities.Material{}, ErrMaterialNotFound
}
