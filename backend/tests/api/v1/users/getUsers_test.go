package usersController

import (
	"encoding/json"
	"fmt"
	"net/http"
	"stock-inventory/app/entities"
	"stock-inventory/app/users"
	"stock-inventory/tests/api/helpers"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

type UsersResponse struct {
	Users []entities.User `json:"users"`
}

func TestReturnEmptyUsers(t *testing.T) {
	api := helpers.CreateAPI(t)

	response := helpers.Request(api.Router, "GET", "/api/v1/users", nil)

	var usersResult UsersResponse

	err := json.NewDecoder(response.Body).Decode(&usersResult)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	assert.Equal(t, http.StatusOK, response.Code)
	assert.Empty(t, usersResult.Users)
}

func TestReturnSingleUser(t *testing.T) {
	api := helpers.CreateAPI(t)
	newUser := entities.User{
		Id:       uuid.New(),
		FullName: "John Doe",
		Username: "john_doe",
	}

	_, err := users.Create(api.App.Database, newUser)
	assert.NoError(t, err, "Error creating user")

	response := helpers.Request(api.Router, "GET", "/api/v1/users", nil)

	var usersResponse UsersResponse
	err = json.NewDecoder(response.Body).Decode(&usersResponse)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	users, err := users.FindAll(api.App.Database)
	if err != nil {
		fmt.Println("Error find all users:", err)
		return
	}

	assert.Equal(t, http.StatusOK, response.Code)
	assert.Equal(t, 1, len(usersResponse.Users))
	assert.Equal(t, users, usersResponse.Users)
}

func TestReturnMultipleUsers(t *testing.T) {
	api := helpers.CreateAPI(t)

	newUser := entities.User{
		Id:       uuid.New(),
		FullName: "John Doe",
		Username: "john_doe",
	}

	_, err := users.Create(api.App.Database, newUser)
	assert.NoError(t, err, "Error creating user 1")

	newUser2 := entities.User{
		Id:       uuid.New(),
		FullName: "John Doe",
		Username: "john_doe",
	}

	_, err2 := users.Create(api.App.Database, newUser2)
	assert.NoError(t, err2, "Error creating user 2")

	response := helpers.Request(api.Router, "GET", "/api/v1/users", nil)

	var usersResponse UsersResponse
	err = json.NewDecoder(response.Body).Decode(&usersResponse)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	users, err := users.FindAll(api.App.Database)
	if err != nil {
		fmt.Println("Error find all users:", err)
		return
	}

	assert.Equal(t, http.StatusOK, response.Code)
	assert.Equal(t, 2, len(usersResponse.Users))
	assert.Equal(t, users, usersResponse.Users)
}

// TODO: create test when database raise an unexpected error
