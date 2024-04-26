package usersController

import (
	"encoding/json"
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/entities"
	"stock-inventory/app/users"
)

func (controller *UsersController) CreateUser(response http.ResponseWriter, request *http.Request) {
	var newUser entities.User
	var database = controller.App.Database

	if err := json.NewDecoder(request.Body).Decode(&newUser); err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := users.Create(database, newUser)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	responses.Json(response, http.StatusCreated, user)
}
