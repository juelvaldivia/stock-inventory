package api

import (
	"net/http"

	"stock-inventory/api/responses"
)

func (api *API) Welcome(response http.ResponseWriter, request *http.Request) {
	responses.Json(response, http.StatusOK, map[string]string{"message": "Welcome to stock inventory API"})
}
