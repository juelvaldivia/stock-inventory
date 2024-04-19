package api

import (
	"github.com/go-chi/chi/v5"

	routers "stock-inventory/api/v1"
)

func (api *API) RoutesApiV1() chi.Router {
	router := chi.NewRouter()

	brandsRouter := routers.BrandsRouterNew(api.App)
	router.Mount("/brands", brandsRouter.GetRoutes())

	clientsRouter := routers.ClientsRouterNew(api.App)
	router.Mount("/clients", clientsRouter.GetRoutes())

	productsRouter := routers.ProductsRouterNew(api.App)
	router.Mount("/products", productsRouter.GetRoutes())

	usersRouter := routers.UsersRouterNew(api.App)
	router.Mount("/users", usersRouter.GetRoutes())

	return router
}
