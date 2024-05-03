package materialsStore

import (
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"

	"stock-inventory/app/entities"
	"stock-inventory/database/filters"
	"stock-inventory/database/utils"
)

var ErrCreatingMaterial = errors.New("error creating material")
var ErrGettingMaterials = errors.New("error getting materials")
var ErrFindingMaterial = errors.New("error finding material")
var ErrUpdatingMaterialInventory = errors.New("error updating material inventory")
var ErrFindingMaterialsByProduct = errors.New("error updating materials by product")

type SqlConnection struct {
	*sqlx.DB
}

func New(connection *sqlx.DB) *SqlConnection {
	return &SqlConnection{
		DB: connection,
	}
}

func (connection *SqlConnection) FindAll(
	pagination *utils.Pagination,
	filters *filters.MaterialsFilters,
) (entities.MaterialsList, error) {
	if pagination == nil {
		pagination = utils.NewPagination(1, 25)
	}

	var materials []entities.Material
	var totalItems int

	queryCount := `SELECT COUNT(*) FROM materials`
	queryCount, errApplyingCountFilters := applyFilters(queryCount, filters)
	if errApplyingCountFilters != nil {
		return entities.MaterialsList{}, errApplyingCountFilters
	}

	errCountTotal := connection.DB.QueryRow(queryCount).Scan(&totalItems)
	if errCountTotal != nil {
		return entities.MaterialsList{}, errors.Join(ErrGettingMaterials, errCountTotal)
	}

	query := `SELECT
							id, name, description, quantity_available AS quantityAvailable,
							quantity_limit AS quantityLimit, image_uri AS imageUri
						FROM materials`

	query, errApplyingFilters := applyFilters(query, filters)
	if errApplyingFilters != nil {
		return entities.MaterialsList{}, errApplyingFilters
	}

	query = applyPagination(query, pagination)

	if err := connection.Select(&materials, query); err != nil {
		return entities.MaterialsList{}, errors.Join(ErrGettingMaterials, err)
	}

	if materials == nil {
		materials = []entities.Material{}
	}

	materialsList := entities.MaterialsList{
		TotalItems:  totalItems,
		TotalPages:  pagination.CalculateTotalPages(totalItems),
		CurrentPage: pagination.Page,
		PerPage:     pagination.PerPage,
		Items:       materials,
	}

	return materialsList, nil
}

func (connection *SqlConnection) Create(material entities.Material) (entities.Material, error) {
	newMaterial := material

	err := connection.Get(
		&newMaterial,
		`INSERT INTO materials
			(name, description, quantity_available, quantity_limit, image_uri)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING
			id, name, description, quantity_available AS quantityAvailable,
			quantity_limit AS quantityLimit`,
		material.Name,
		material.Description,
		material.QuantityAvailable,
		material.QuantityLimit,
		material.ImageUri,
	)

	if err != nil {
		return entities.Material{}, errors.Join(ErrCreatingMaterial, err)
	}

	materialCreated, err := connection.FindById(newMaterial.Id)
	if err != nil {
		return entities.Material{}, errors.Join(ErrCreatingMaterial, err)
	}

	return materialCreated, nil
}

func (connection *SqlConnection) FindById(id uuid.UUID) (entities.Material, error) {
	var material entities.Material
	var query = `SELECT
								id, name, description, quantity_available AS quantityAvailable,
								quantity_limit AS quantityLimit, image_uri AS imageUri
							 FROM materials
							 WHERE id = $1`

	err := connection.Get(&material, query, id)

	if err != nil {
		return entities.Material{}, errors.Join(ErrFindingMaterial, err)
	}

	return material, nil
}

func (connection *SqlConnection) FindByProduct(
	product entities.Product,
) ([]entities.Material, error) {
	var materials []entities.Material
	var query = `SELECT m.id, m.name, m.description, m.quantity_available AS quantityAvailable,
								 m.quantity_limit AS quantityLimit, pm.quantity_used AS quantityUsed,
								 m.image_uri AS imageUri
							 FROM materials m
							 INNER JOIN product_materials pm ON m.id = pm.material_id
							 WHERE pm.product_id = $1`

	err := connection.Select(&materials, query, product.Id)

	if err != nil {
		return []entities.Material{}, errors.Join(ErrFindingMaterialsByProduct, err)
	}

	if materials == nil {
		materials = []entities.Material{}
	}

	return materials, nil
}

func (connection *SqlConnection) UpdateQuantityAvailable(
	material entities.Material,
	newQuantity int,
) (entities.Material, error) {
	var query = `UPDATE materials SET quantity_available = $1 WHERE id = $2`

	_, err := connection.Exec(query, newQuantity, material.Id)
	if err != nil {
		return entities.Material{}, errors.Join(ErrUpdatingMaterialInventory, err)
	}

	return entities.Material{}, nil
}

func applyPagination(query string, pagination *utils.Pagination) string {
	return fmt.Sprintf("%s OFFSET %d LIMIT %d", query, pagination.Offset(), pagination.Limit())
}

func applyFilters(query string, filters *filters.MaterialsFilters) (string, error) {
	if filters != nil {
		filterQuery := ""
		hasFilter := false

		if filters.Has("name") {
			name, err := filters.Get("name")
			if err != nil {
				return query, err
			}

			filterQuery += fmt.Sprintf("LOWER(name) LIKE '%%%s%%'", strings.ToLower(name))
			hasFilter = true
		}

		if hasFilter {
			query += " WHERE " + filterQuery
		}
	}

	return query, nil
}
