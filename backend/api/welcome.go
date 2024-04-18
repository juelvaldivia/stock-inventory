package api

import (
	http "net/http"

	responses "stock-inventory/api/responses"
)

func (api *API) Welcome(response http.ResponseWriter, request *http.Request) {
	responses.Json(response, http.StatusOK, map[string]string{"message": "Welcome to stock inventory API"})
}
