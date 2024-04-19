package brandsController

import (
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/brands"
)

func (controller *BrandsController) GetBrands(response http.ResponseWriter, request *http.Request) {
	var database = controller.App.Database

	result, err := brands.FindAll(database)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	brandMap := make(map[string]interface{})
	brandMap["brands"] = result

	responses.Json(response, http.StatusOK, brandMap)
}
