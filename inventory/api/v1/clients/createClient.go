package clientsController

import (
	"encoding/json"
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/clients"
	"stock-inventory/app/entities"
)

func (controller *ClientsController) CreateClient(
	response http.ResponseWriter,
	request *http.Request,
) {
	var newClient entities.Client
	var database = controller.App.Database

	if err := json.NewDecoder(request.Body).Decode(&newClient); err != nil {
		responses.Json(response, http.StatusBadRequest, err.Error())
		return
	}

	client, err := clients.Create(database, newClient)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusCreated, client)
}
