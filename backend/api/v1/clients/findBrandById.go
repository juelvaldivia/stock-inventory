package clientsController

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"stock-inventory/api/responses"
	"stock-inventory/app/clients"
)

func (controller *ClientsController) FindClientById(response http.ResponseWriter, request *http.Request) {
	var database = controller.App.Database

	clientId := chi.URLParam(request, "id")

	id, err := uuid.Parse(clientId)

	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	client, err := clients.FindById(database, id)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	responses.Json(response, http.StatusOK, client)
}
