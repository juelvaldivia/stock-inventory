package clientsController

import (
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/clients"
)

func (controller *ClientsController) GetClients(
	response http.ResponseWriter,
	request *http.Request,
) {
	var database = controller.App.Database

	result, err := clients.FindAll(database)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusOK, result)
}
