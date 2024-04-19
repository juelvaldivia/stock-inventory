package productsController

import (
	"encoding/json"
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/entities"
	"stock-inventory/app/products"
)

func (controller *ProductsController) CreateProduct(response http.ResponseWriter, request *http.Request) {
	var newProduct entities.Product
	var database = controller.App.Database

	if err := json.NewDecoder(request.Body).Decode(&newProduct); err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	product, err := products.Create(database, newProduct)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	responses.Json(response, http.StatusCreated, product)
}
