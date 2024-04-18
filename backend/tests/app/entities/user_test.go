package entities

import (
	"stock-inventory/app/entities"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestUser(t *testing.T) {
	id := uuid.New()

	user := entities.User{
		Id:       id,
		FullName: "John Doe",
		Username: "john_doe",
	}

	assert.Equal(t, id, user.Id, "User Id is not equal")
	assert.Equal(t, "John Doe", user.FullName, "Name is not equal")
	assert.Equal(t, "john_doe", user.Username, "User is not equal")
}
