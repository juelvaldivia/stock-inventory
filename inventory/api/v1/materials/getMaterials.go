package materialsController

import (
	"net/http"
	"strconv"

	"stock-inventory/api/responses"
	"stock-inventory/app/materials"
	"stock-inventory/database/filters"
)

func (controller *MaterialsController) GetMaterials(
	response http.ResponseWriter,
	request *http.Request,
) {
	queryValues := request.URL.Query()

	pageParam := queryValues.Get("page")
	if pageParam == "" {
		pageParam = "1"
	}

	perPageParam := queryValues.Get("perPage")
	if perPageParam == "" {
		perPageParam = "200"
	}

	page, err := strconv.Atoi(pageParam)
	if err != nil {
		responses.Json(response, http.StatusBadRequest, "Page must be a number")
		return
	}

	perPage, err := strconv.Atoi(perPageParam)
	if err != nil {
		responses.Json(response, http.StatusBadRequest, "Per page must be a number")
		return
	}

	var dispersionFilters = filters.NewMaterialsFilters()
	name := queryValues.Get("name")

	if name != "" {
		dispersionFilters.ByName(name)
	}
	category := queryValues.Get("category")

	if category != "" {
		dispersionFilters.ByCategory(category)
	}

	var database = controller.App.Database

	result, err := materials.FindAll(database, page, perPage, dispersionFilters)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusOK, result)
}
