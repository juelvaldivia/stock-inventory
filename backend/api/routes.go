package api

import (
	chi "github.com/go-chi/chi/v5"

	usersRouter "stock-inventory/api/v1"
)

func (api *API) RoutesApiV1() chi.Router {
	router := chi.NewRouter()

	usersRouter := usersRouter.New(api.App)

	router.Mount("/users", usersRouter.GetRoutes())

	return router
}
