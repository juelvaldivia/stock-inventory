package server

import (
	fmt "fmt"
	http "net/http"
)

type ServerHTTP struct {
	Port   int
	Router http.Handler
}

func NewServerHTTP(port int, router http.Handler) *ServerHTTP {
	return &ServerHTTP{
		Port:   port,
		Router: router,
	}
}

func (server *ServerHTTP) Listen() error {
	addr := fmt.Sprintf(":%d", server.Port)
	fmt.Printf("Server listening on %s\n", addr)

	return http.ListenAndServe(addr, server.Router)
}
