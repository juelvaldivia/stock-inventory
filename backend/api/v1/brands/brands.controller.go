package brandsController

import "stock-inventory/app"

type BrandsController struct {
	App *app.App
}

func New(app *app.App) *BrandsController {
	return &BrandsController{
		App: app,
	}
}
