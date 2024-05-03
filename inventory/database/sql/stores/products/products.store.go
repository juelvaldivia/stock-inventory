package productsStore

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

var ErrCreatingProduct = errors.New("error creating product")
var ErrGettingProducts = errors.New("error getting products")
var ErrFindingProduct = errors.New("error finding product")
var ErrUpdatingProductInventory = errors.New("error updating product")
var ErrAssignMaterial = errors.New("error assign material")
var ErrUpdatingProductImage = errors.New("error updating product image")

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
	filters *filters.ProductsFilters,
) (entities.ProductsList, error) {
	if pagination == nil {
		pagination = utils.NewPagination(1, 25)
	}

	var products []entities.Product
	var totalItems int

	queryCount := `SELECT COUNT(*) FROM products`
	queryCount, errApplyingCountFilters := applyFilters(queryCount, filters)
	if errApplyingCountFilters != nil {
		return entities.ProductsList{}, errApplyingCountFilters
	}

	errCountTotal := connection.DB.QueryRow(queryCount).Scan(&totalItems)
	if errCountTotal != nil {
		return entities.ProductsList{}, errors.Join(ErrGettingProducts, errCountTotal)
	}

	query := `SELECT
							id, brand_id as brandId, name, category, price, style, size,
							stock_quantity AS stockQuantity, stock_limit AS stockLimit, image_uri AS imageUri
						FROM products`

	query, errApplyingFilters := applyFilters(query, filters)
	if errApplyingFilters != nil {
		return entities.ProductsList{}, errApplyingFilters
	}

	query = applyPagination(query, pagination)

	if err := connection.Select(&products, query); err != nil {
		return entities.ProductsList{}, errors.Join(ErrGettingProducts, err)
	}

	if products == nil {
		products = []entities.Product{}
	}

	productsList := entities.ProductsList{
		TotalItems:  totalItems,
		TotalPages:  pagination.CalculateTotalPages(totalItems),
		CurrentPage: pagination.Page,
		PerPage:     pagination.PerPage,
		Items:       products,
	}

	return productsList, nil
}

func (connection *SqlConnection) Create(product entities.Product) (entities.Product, error) {
	newProduct := product

	err := connection.Get(
		&newProduct,
		`INSERT INTO products
			(brand_id, name, category, price, style, size, stock_quantity, stock_limit, image_uri)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING
			id, brand_id AS brandId, name, category, price, style, size,
			stock_quantity AS stockQuantity, stock_limit AS stockLimit`,
		product.BrandId,
		product.Name,
		product.Category,
		product.Price,
		product.Style,
		product.Size,
		product.StockQuantity,
		product.StockLimit,
		product.ImageUri,
	)

	if err != nil {
		return entities.Product{}, errors.Join(ErrCreatingProduct, err)
	}

	productCreated, err := connection.FindById(newProduct.Id)
	if err != nil {
		return entities.Product{}, errors.Join(ErrCreatingProduct, err)
	}

	return productCreated, nil
}

func (connection *SqlConnection) FindById(id uuid.UUID) (entities.Product, error) {
	var product entities.Product
	var query = `SELECT
								id, brand_id AS brandId, name, category, price, style, size,
								stock_quantity AS stockQuantity, stock_limit AS stockLimit, image_uri AS imageUri
							 FROM products
							 WHERE id = $1`

	err := connection.Get(&product, query, id)

	if err != nil {
		return entities.Product{}, errors.Join(ErrFindingProduct, err)
	}

	return product, nil
}

func (connection *SqlConnection) UpdateStockQuantity(
	product entities.Product,
	newQuantity int,
) (entities.Product, error) {
	var query = `UPDATE products SET stock_quantity = $1 WHERE id = $2`

	_, err := connection.Exec(query, newQuantity, product.Id)
	if err != nil {
		return entities.Product{}, errors.Join(ErrUpdatingProductInventory, err)
	}

	return entities.Product{}, nil
}

func (connection *SqlConnection) AssignMaterial(
	product entities.Product,
	material entities.Material,
	quantityUsed int,
) error {
	_, err := connection.Exec(
		`INSERT INTO product_materials
				(product_id, material_id, quantity_used)
			VALUES ($1, $2, $3)`,
		product.Id,
		material.Id,
		quantityUsed,
	)

	if err != nil {
		return errors.Join(ErrAssignMaterial, err)
	}

	return nil
}

func (connection *SqlConnection) UpdateImage(product entities.Product, imageUri string) error {
	var query = `UPDATE products SET image_uri = $1 WHERE id = $2`

	_, err := connection.Exec(query, imageUri, product.Id)
	if err != nil {
		return errors.Join(ErrUpdatingProductImage, err)
	}

	return nil
}

func applyPagination(query string, pagination *utils.Pagination) string {
	return fmt.Sprintf("%s OFFSET %d LIMIT %d", query, pagination.Offset(), pagination.Limit())
}

func applyFilters(query string, filters *filters.ProductsFilters) (string, error) {
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

		if filters.Has("category") {
			category, err := filters.Get("category")
			if err != nil {
				return query, err
			}

			if hasFilter {
				filterQuery += " AND "
			}

			filterQuery += fmt.Sprintf("LOWER(category) LIKE '%%%s%%'", strings.ToLower(category))
			hasFilter = true
		}

		if hasFilter {
			query += " WHERE " + filterQuery
		}
	}

	return query, nil
}
