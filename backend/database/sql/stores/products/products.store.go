package productsStore

import (
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"

	"stock-inventory/app/entities"
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

func (connection *SqlConnection) FindAll(pagination *utils.Pagination) (entities.ProductsList, error) {
	if pagination == nil {
		pagination = utils.NewPagination(1, 25)
	}

	var products []entities.Product
	var totalItems int

	query := `SELECT
							id, name, category, price, stockquantity AS stockQuantity, brand_id as brandId
						FROM products`

	query = applyPagination(query, pagination)

	err := connection.DB.QueryRow("SELECT COUNT(*) FROM products").Scan(&totalItems)
	if err != nil {
		return entities.ProductsList{}, errors.Join(ErrGettingProducts, err)
	}

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
