package routers

import (
	chi "github.com/go-chi/chi/v5"

	clientsController "stock-inventory/api/v1/clients"
	"stock-inventory/app"
)

type ClientsRouter struct {
	App *app.App
}

func ClientsRouterNew(app *app.App) *ClientsRouter {
	return &ClientsRouter{
		App: app,
	}
}

func (clientsRouter *ClientsRouter) GetRoutes() chi.Router {
	router := chi.NewRouter()

	clientsController := clientsController.New(clientsRouter.App)

	router.Get("/", clientsController.GetClients)
	router.Post("/", clientsController.CreateClient)
	router.Get("/{id}", clientsController.FindClientById)

	return router
}
