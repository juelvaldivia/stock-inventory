package clientsController

import "stock-inventory/app"

type ClientsController struct {
	App *app.App
}

func New(app *app.App) *ClientsController {
	return &ClientsController{
		App: app,
	}
}
