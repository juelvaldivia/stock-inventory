package clientsController

import (
	"encoding/json"
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/clients"
	"stock-inventory/app/entities"
)

func (controller *ClientsController) CreateClient(response http.ResponseWriter, request *http.Request) {
	var newClient entities.Client
	var database = controller.App.Database

	if err := json.NewDecoder(request.Body).Decode(&newClient); err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	client, err := clients.Create(database, newClient)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	responses.Json(response, http.StatusCreated, client)
}
