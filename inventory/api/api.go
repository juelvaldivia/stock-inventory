package api

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"

	"stock-inventory/app"
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

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300, // seconds
	})

	api := &API{
		Router: router,
		App:    app,
	}

	router.Use(cors.Handler)

	router.Get("/", api.Welcome)
	router.Get("/health", api.HealthCheck)
	router.Mount("/api/v1", api.RoutesApiV1())

	return api
}
