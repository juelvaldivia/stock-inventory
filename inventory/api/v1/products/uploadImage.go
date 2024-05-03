package productsController

import (
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/products"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

func (controller *ProductsController) UploadImage(
	response http.ResponseWriter,
	request *http.Request,
) {
	var database = controller.App.Database
	var fileRepository = controller.App.FileRepository

	productId := chi.URLParam(request, "id")
	id, err := uuid.Parse(productId)

	if err != nil {
		responses.Json(response, http.StatusBadRequest, err.Error())
		return
	}

	product, err := products.FindById(database, id)
	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	// Limit file to 10 MB.
	err = request.ParseMultipartForm(10 << 20)
	if err != nil {
		responses.Json(response, http.StatusBadRequest, "Error parsing multipart form: "+err.Error())
		return
	}

	file, fileHeader, err := request.FormFile("image")
	if err != nil {
		responses.Json(response, http.StatusBadRequest, "Error retrieving image: "+err.Error())
		return
	}
	defer file.Close()

	err = products.UploadImage(database, fileRepository, file, fileHeader, product)
	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusCreated, map[string]bool{"ok": true})
}
