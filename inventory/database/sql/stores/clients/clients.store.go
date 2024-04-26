package clientsStore

import (
	"errors"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"

	"stock-inventory/app/entities"
)

var ErrCreatingClient = errors.New("error creating client")
var ErrGettingClients = errors.New("error getting clients")
var ErrFindingClient = errors.New("error finding client")

type SqlConnection struct {
	*sqlx.DB
}

func New(connection *sqlx.DB) *SqlConnection {
	return &SqlConnection{
		DB: connection,
	}
}

func (connection *SqlConnection) FindAll() ([]entities.Client, error) {
	var clients []entities.Client
	var query = `SELECT
								 id, names, first_last_name AS firstLastName, second_last_name AS secondLastName,
								 address, phone, status, created_at AS createdAt
							 FROM clients`

	if err := connection.Select(&clients, query); err != nil {
		return []entities.Client{}, errors.Join(ErrGettingClients, err)
	}

	return clients, nil
}

func (connection *SqlConnection) Create(client entities.Client) error {
	if err := connection.Get(
		client,
		`INSERT INTO clients
		   (names, first_last_name, second_last_name, address, phone, status, created_at)
		 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
		client.Names,
		client.FirstLastName,
		client.SecondLastName,
		client.Address,
		client.Phone,
		client.Status,
		client.CreatedAt,
	); err != nil {
		return errors.Join(ErrCreatingClient, err)
	}

	return nil
}

func (connection *SqlConnection) FindById(id uuid.UUID) (entities.Client, error) {
	var client entities.Client
	var query = `SELECT
								 id, names, first_last_name AS firstLastName, second_last_name AS secondLastName,
								 address, phone, status, created_at AS createdAt
							 FROM clients
							 WHERE id = $1`

	if err := connection.Get(&client, query, id); err != nil {
		return entities.Client{}, errors.Join(ErrFindingClient, err)
	}

	return client, nil
}
