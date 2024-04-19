package brandsController

import (
	"encoding/json"
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/brands"
	"stock-inventory/app/entities"
)

func (controller *BrandsController) CreateBrand(response http.ResponseWriter, request *http.Request) {
	var newBrand entities.Brand
	var database = controller.App.Database

	if err := json.NewDecoder(request.Body).Decode(&newBrand); err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := brands.Create(database, newBrand)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	responses.Json(response, http.StatusCreated, user)
}
