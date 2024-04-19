package usersStore

import (
	"errors"
	"stock-inventory/app/entities"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

var ErrCreatingUser = errors.New("error creating user")
var ErrGettingUsers = errors.New("error getting users")
var ErrFindingUser = errors.New("error finding user")

type SqlConnection struct {
	*sqlx.DB
}

func New(connection *sqlx.DB) *SqlConnection {
	return &SqlConnection{
		DB: connection,
	}
}

func (connection *SqlConnection) All() ([]entities.User, error) {
	var users []entities.User
	var query = `SELECT
							   id, user_id as userId, full_name as fullName, phone, email, username,
								 last_session_date as lastSessionDate, created_at as createdAt,
								 updated_at as updatedAt
							 FROM users`

	if err := connection.Select(&users, query); err != nil {
		return []entities.User{}, errors.Join(ErrGettingUsers, err)
	}

	return users, nil
}

func (connection *SqlConnection) Create(user entities.User) error {
	if err := connection.Get(
		user, `INSERT INTO users (name, username, password) VALUES ($1, $2, $3, $4) RETURNING *`,
		user.FullName,
		user.Username,
	); err != nil {
		return errors.Join(ErrCreatingUser, err)
	}

	return nil
}

func (connection *SqlConnection) FindById(id uuid.UUID) (entities.User, error) {
	var user entities.User

	if err := connection.Get(&user, `SELECT * FROM users WHERE id = $1`, id); err != nil {
		return entities.User{}, errors.Join(ErrFindingUser, err)
	}

	return entities.User{}, nil
}
