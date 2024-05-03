package routers

import (
	chi "github.com/go-chi/chi/v5"

	productsController "stock-inventory/api/v1/products"
	"stock-inventory/app"
)

type ProductsRouter struct {
	App *app.App
}

func ProductsRouterNew(app *app.App) *ProductsRouter {
	return &ProductsRouter{
		App: app,
	}
}

func (productsRouter *ProductsRouter) GetRoutes() chi.Router {
	router := chi.NewRouter()

	productsController := productsController.New(productsRouter.App)

	router.Get("/", productsController.GetProducts)
	router.Post("/", productsController.CreateProduct)
	router.Get("/{id}", productsController.FindProductById)
	router.Post("/{id}/uploadImage", productsController.UploadImage)
	router.Post("/{id}/produce", productsController.ProduceProduct)

	return router
}
