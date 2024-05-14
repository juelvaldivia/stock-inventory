package clientsController

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"stock-inventory/api/responses"
	"stock-inventory/app/clients"
)

func (controller *ClientsController) FindClientById(
	response http.ResponseWriter,
	request *http.Request,
) {
	var database = controller.App.Database

	clientId := chi.URLParam(request, "id")

	id, err := uuid.Parse(clientId)

	if err != nil {
		responses.Json(response, http.StatusBadRequest, err.Error())
		return
	}

	client, err := clients.FindById(database, id)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusOK, client)
}
