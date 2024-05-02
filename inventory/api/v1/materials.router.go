package routers

import (
	chi "github.com/go-chi/chi/v5"

	materialsController "stock-inventory/api/v1/materials"
	"stock-inventory/app"
)

type MaterialsRouter struct {
	App *app.App
}

func MaterialsRouterNew(app *app.App) *MaterialsRouter {
	return &MaterialsRouter{
		App: app,
	}
}

func (materialsRouter *MaterialsRouter) GetRoutes() chi.Router {
	router := chi.NewRouter()

	materialsController := materialsController.New(materialsRouter.App)

	router.Get("/", materialsController.GetMaterials)
	router.Post("/", materialsController.CreateMaterial)

	return router
}
