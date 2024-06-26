package brandsController

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"stock-inventory/api/responses"
	"stock-inventory/app/brands"
)

func (controller *BrandsController) FindBrandById(
	response http.ResponseWriter,
	request *http.Request,
) {
	var database = controller.App.Database

	brandId := chi.URLParam(request, "id")

	id, err := uuid.Parse(brandId)

	if err != nil {
		responses.Json(response, http.StatusBadRequest, err.Error())
		return
	}

	brand, err := brands.FindById(database, id)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusOK, brand)
}
