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

type SqlConnection struct {
	*sqlx.DB
}

func New(connection *sqlx.DB) *SqlConnection {
	return &SqlConnection{
		DB: connection,
	}
}

func (connection *SqlConnection) FindAll(pagination *utils.Pagination, filters *filters.ProductsFilters) (entities.ProductsList, error) {
	if pagination == nil {
		pagination = utils.NewPagination(1, 25)
	}

	var products []entities.Product
	var totalItems int

	queryCount := fmt.Sprintf("SELECT COUNT(*) FROM products")
	queryCount, errApplyingCountFilters := applyFilters(queryCount, filters)
	if errApplyingCountFilters != nil {
		return entities.ProductsList{}, errApplyingCountFilters
	}

	errCountTotal := connection.DB.QueryRow(queryCount).Scan(&totalItems)
	if errCountTotal != nil {
		return entities.ProductsList{}, errors.Join(ErrGettingProducts, errCountTotal)
	}

	query := `SELECT
							id, name, category, price, stockquantity AS stockQuantity, brand_id as brandId
						FROM products`

	query, errApplyingFilters := applyFilters(query, filters)
	if errApplyingFilters != nil {
		return entities.ProductsList{}, errApplyingFilters
	}

	query = applyPagination(query, pagination)

	if err := connection.Select(&products, query); err != nil {
		return entities.ProductsList{}, errors.Join(ErrGettingProducts, err)
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
			(name, category, price, stockquantity, brand_id)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, name, category, price, stockquantity AS stockQuantity, brand_id AS brandId`,
		product.Name,
		product.Category,
		product.Price,
		product.StockQuantity,
		product.BrandId,
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
								 id, name, category, price, stockquantity AS stockQuantity, brand_id AS brandId
							 FROM products
							 WHERE id = $1`

	err := connection.Get(&product, query, id)

	if err != nil {
		return entities.Product{}, errors.Join(ErrFindingProduct, err)
	}

	return product, nil
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
