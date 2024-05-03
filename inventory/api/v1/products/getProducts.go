package productsController

import (
	"net/http"
	"strconv"

	"stock-inventory/api/responses"
	"stock-inventory/app/products"
	"stock-inventory/database/filters"
)

func (controller *ProductsController) GetProducts(
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

	var productsFilters = filters.NewProductsFilters()
	name := queryValues.Get("name")

	if name != "" {
		productsFilters.ByName(name)
	}
	category := queryValues.Get("category")

	if category != "" {
		productsFilters.ByCategory(category)
	}

	var database = controller.App.Database
	var fileRepository = controller.App.FileRepository

	result, err := products.FindAll(database, fileRepository, page, perPage, productsFilters)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	responses.Json(response, http.StatusOK, result)
}
