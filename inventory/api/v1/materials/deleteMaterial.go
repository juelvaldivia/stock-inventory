package materialsController

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"stock-inventory/api/responses"
)

func (controller *MaterialsController) DeleteMaterial(
	response http.ResponseWriter,
	request *http.Request,
) {
	var database = controller.App.Database

	materialId := chi.URLParam(request, "id")

	id, err := uuid.Parse(materialId)
	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	err = database.Materials().Delete(id)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusOK, nil)
}
