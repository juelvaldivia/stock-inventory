package usersController

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"stock-inventory/app/users"

	"stock-inventory/api/responses"
)

func (controller *UsersController) FindUserById(response http.ResponseWriter, request *http.Request) {
	var database = controller.App.Database

	userId := chi.URLParam(request, "id")

	id, err := uuid.Parse(userId)

	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := users.FindUserById(database, id)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	responses.Json(response, http.StatusOK, user)
}
