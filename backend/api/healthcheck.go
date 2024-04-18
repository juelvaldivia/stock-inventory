package api

import (
	http "net/http"

	responses "stock-inventory/api/responses"
)

func (api *API) HealthCheck(response http.ResponseWriter, request *http.Request) {
	responses.Json(response, http.StatusOK, map[string]bool{"ok": true})
}
