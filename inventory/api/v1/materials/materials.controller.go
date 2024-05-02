package materialsController

import "stock-inventory/app"

type MaterialsController struct {
	App *app.App
}

func New(app *app.App) *MaterialsController {
	return &MaterialsController{
		App: app,
	}
}
