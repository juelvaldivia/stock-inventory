package usersController

import "stock-inventory/app"

type UsersController struct {
	App *app.App
}

func New(app *app.App) *UsersController {
	return &UsersController{
		App: app,
	}
}
