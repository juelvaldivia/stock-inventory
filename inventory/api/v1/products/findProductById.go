package productsController

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"stock-inventory/api/responses"
	"stock-inventory/app/products"
)

func (controller *ProductsController) FindProductById(
	response http.ResponseWriter,
	request *http.Request,
) {
	var database = controller.App.Database
	var fileRepository = controller.App.FileRepository

	productId := chi.URLParam(request, "id")

	id, err := uuid.Parse(productId)
	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	product, err := products.FindById(database, id)
	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	// TODO: use base url from configuration
	imageURL, err := fileRepository.URLFromURI("http://localhost:4321", product.ImageUri)
	if err != nil {
		responses.Json(response, http.StatusInternalServerError, "Error building image url: "+err.Error())
		return
	}

	product.ImageUrl = imageURL

	responses.Json(response, http.StatusOK, product)
}
