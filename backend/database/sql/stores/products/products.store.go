package productsStore

import (
	"errors"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"

	"stock-inventory/app/entities"
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

func (connection *SqlConnection) FindAll() ([]entities.Product, error) {
	var products []entities.Product
	var query = `SELECT
							   id, name, category, price, stockquantity AS stockQuantity, brand_id as brandId
							 FROM products`

	if err := connection.Select(&products, query); err != nil {
		return []entities.Product{}, errors.Join(ErrGettingProducts, err)
	}

	return products, nil
}

func (connection *SqlConnection) Create(product entities.Product) error {
	if err := connection.Get(
		product,
		`INSERT INTO products
			(name, category, price, stockquantity, brand_id)
		VALUES ($1, $2, $3, $4, $5) RETURNING *`,
		product.Name,
		product.Category,
		product.Price,
		product.StockQuantity,
		product.BrandId,
	); err != nil {
		return errors.Join(ErrCreatingProduct, err)
	}

	return nil
}

func (connection *SqlConnection) FindById(id uuid.UUID) (entities.Product, error) {
	var product entities.Product
	var query = `SELECT
								 id, name, category, price, stockquantity AS stockQuantity, brand_id as brandId
							 FROM products
							 WHERE id = $1`

	if err := connection.Get(&product, query, id); err != nil {
		return entities.Product{}, errors.Join(ErrFindingProduct, err)
	}

	return product, nil
}
