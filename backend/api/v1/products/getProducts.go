package productsController

import (
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/products"
)

func (controller *ProductsController) GetProducts(response http.ResponseWriter, request *http.Request) {
	var database = controller.App.Database

	result, err := products.FindAll(database)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	productMap := make(map[string]interface{})
	productMap["products"] = result

	responses.Json(response, http.StatusOK, productMap)
}
