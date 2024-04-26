package routers

import (
	"github.com/go-chi/chi/v5"

	usersController "stock-inventory/api/v1/users"
	"stock-inventory/app"
)

type UsersRouter struct {
	App *app.App
}

func UsersRouterNew(app *app.App) *UsersRouter {
	return &UsersRouter{
		App: app,
	}
}

func (usersRouter *UsersRouter) GetRoutes() chi.Router {
	router := chi.NewRouter()

	usersController := usersController.New(usersRouter.App)

	router.Get("/", usersController.GetUsers)
	router.Post("/", usersController.CreateUser)
	router.Get("/{id}", usersController.FindUserById)

	return router
}
