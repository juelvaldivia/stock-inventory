package routers

import (
	chi "github.com/go-chi/chi/v5"

	brandsController "stock-inventory/api/v1/brands"
	"stock-inventory/app"
)

type BrandsRouter struct {
	App *app.App
}

func BrandsRouterNew(app *app.App) *BrandsRouter {
	return &BrandsRouter{
		App: app,
	}
}

func (brandsRouter *BrandsRouter) GetRoutes() chi.Router {
	router := chi.NewRouter()

	brandsController := brandsController.New(brandsRouter.App)

	router.Get("/", brandsController.GetBrands)
	router.Post("/", brandsController.CreateBrand)
	router.Get("/{id}", brandsController.FindBrandById)

	return router
}
