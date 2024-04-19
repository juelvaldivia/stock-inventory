package api

import (
	"github.com/go-chi/chi/v5"

	routers "stock-inventory/api/v1"
)

func (api *API) RoutesApiV1() chi.Router {
	router := chi.NewRouter()

	usersRouter := routers.UsersRouterNew(api.App)
	productsRouter := routers.ProductsRouterNew(api.App)
	brandsRouter := routers.BrandsRouterNew(api.App)

	router.Mount("/brands", brandsRouter.GetRoutes())
	router.Mount("/products", productsRouter.GetRoutes())
	router.Mount("/users", usersRouter.GetRoutes())

	return router
}
