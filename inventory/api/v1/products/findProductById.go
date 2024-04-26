package productsController

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"stock-inventory/api/responses"
	"stock-inventory/app/products"
)

func (controller *ProductsController) FindProductById(response http.ResponseWriter, request *http.Request) {
	var database = controller.App.Database

	productId := chi.URLParam(request, "id")

	id, err := uuid.Parse(productId)

	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	product, err := products.FindById(database, id)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	responses.Json(response, http.StatusOK, product)
}
