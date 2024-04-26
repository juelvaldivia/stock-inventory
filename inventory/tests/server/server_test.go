package server

import (
	http "net/http"
	server "stock-inventory/server"
	testing "testing"

	assert "github.com/stretchr/testify/assert"
)

func TestStartServerHTTP(t *testing.T) {
	apiFake := http.NewServeMux()
	apiFake.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	server := server.NewServerHTTP(3210, apiFake)

	// Start the server in a goroutine
	go func() {
		err := server.Listen()
		assert.NoError(t, err, "Error starting server")
	}()

	// Make a request to the server
	resp, err := http.Get("http://localhost:3210/test")
	assert.NoError(t, err, "Error making the request")
	defer resp.Body.Close()

	assert.Equal(t, http.StatusOK, resp.StatusCode, "HTTP status code is not OK")
}
