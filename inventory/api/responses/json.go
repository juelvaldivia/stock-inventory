package responses

import (
	"encoding/json"
	"net/http"
)

func Json(response http.ResponseWriter, statusCode int, data interface{}) {
	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(statusCode)

	if data != nil {
		if err := json.NewEncoder(response).Encode(data); err != nil {
			http.Error(response, "Server unexpected error", http.StatusInternalServerError)
			return
		}
	}
}
