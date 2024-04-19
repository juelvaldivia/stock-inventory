package brandsStore

import (
	"errors"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"

	"stock-inventory/app/entities"
)

var ErrCreatingBrand = errors.New("error creating brand")
var ErrGettingBrands = errors.New("error getting brands")
var ErrFindingBrand = errors.New("error finding brand")

type SqlConnection struct {
	*sqlx.DB
}

func New(connection *sqlx.DB) *SqlConnection {
	return &SqlConnection{
		DB: connection,
	}
}

func (connection *SqlConnection) FindAll() ([]entities.Brand, error) {
	var brands []entities.Brand
	var query = `SELECT id, name, logo FROM brands`

	if err := connection.Select(&brands, query); err != nil {
		return []entities.Brand{}, errors.Join(ErrGettingBrands, err)
	}

	return brands, nil
}

func (connection *SqlConnection) Create(brand entities.Brand) error {
	if err := connection.Get(
		brand,
		`INSERT INTO brands (name, logo) VALUES ($1, $2) RETURNING *`,
		brand.Name,
		brand.Logo,
	); err != nil {
		return errors.Join(ErrCreatingBrand, err)
	}

	return nil
}

func (connection *SqlConnection) FindById(id uuid.UUID) (entities.Brand, error) {
	var brand entities.Brand
	var query = `SELECT id, name, logo FROM brands WHERE id = $1`

	if err := connection.Get(&brand, query, id); err != nil {
		return entities.Brand{}, errors.Join(ErrFindingBrand, err)
	}

	return brand, nil
}
