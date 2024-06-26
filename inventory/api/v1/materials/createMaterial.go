package materialsController

import (
	"encoding/json"
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/entities"
	"stock-inventory/app/materials"
)

func (controller *MaterialsController) CreateMaterial(
	response http.ResponseWriter,
	request *http.Request,
) {
	var newMaterial entities.Material
	var database = controller.App.Database

	if err := json.NewDecoder(request.Body).Decode(&newMaterial); err != nil {
		responses.Json(response, http.StatusBadRequest, err.Error())
		return
	}

	material, err := materials.Create(database, newMaterial)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusCreated, material)
}
