package productsController

import (
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/entities"
	"stock-inventory/app/products"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

func (controller *ProductsController) ProduceProduct(
	response http.ResponseWriter,
	request *http.Request,
) {
	productId := chi.URLParam(request, "id")

	id, err := uuid.Parse(productId)

	if err != nil {
		responses.Json(response, http.StatusBadRequest, err.Error())
		return
	}

	var product entities.Product
	var database = controller.App.Database

	product.Id = id

	product, err = products.Produce(database, product)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusCreated, product)
}
