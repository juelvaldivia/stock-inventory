package api

import (
	chi "github.com/go-chi/chi/v5"
	middleware "github.com/go-chi/chi/v5/middleware"

	app "stock-inventory/app"
)

type API struct {
	Router chi.Router
	App    *app.App
}

func New(app *app.App) *API {
	router := chi.NewRouter()
	router.Use(middleware.RequestID)
	router.Use(middleware.RealIP)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	api := &API{
		Router: router,
		App:    app,
	}

	router.Get("/", api.Welcome)
	router.Get("/health", api.HealthCheck)
	router.Mount("/api/v1", api.RoutesApiV1())

	return api
}
