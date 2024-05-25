package materialsController

import (
	"encoding/json"
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/materials"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

func (controller *MaterialsController) AddMaterial(
	response http.ResponseWriter,
	request *http.Request,
) {
	id := chi.URLParam(request, "id")
	materialId, err := uuid.Parse(id)
	if err != nil {
		responses.Json(response, http.StatusBadRequest, err.Error())
		return
	}

	var requestBody struct {
		Quantity int `json:"quantity"`
	}
	if err := json.NewDecoder(request.Body).Decode(&requestBody); err != nil {
		responses.Json(response, http.StatusBadRequest, err.Error())
		return
	}

	var database = controller.App.Database

	material, err := materials.AddMaterial(database, materialId, requestBody.Quantity)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusOK, material)
}
