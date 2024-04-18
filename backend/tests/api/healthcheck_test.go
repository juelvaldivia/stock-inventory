package api

import (
	"net/http"
	"stock-inventory/tests/api/helpers"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestWelcome(t *testing.T) {
	api := helpers.CreateAPI(t)

	response := helpers.Request(api.Router, "GET", "/health", nil)

	assert.Equal(t, http.StatusOK, response.Code)
	assert.JSONEq(t, "{\"ok\":true}", response.Body.String())
}
