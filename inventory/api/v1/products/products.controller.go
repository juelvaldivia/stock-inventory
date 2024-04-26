package productsController

import "stock-inventory/app"

type ProductsController struct {
	App *app.App
}

func New(app *app.App) *ProductsController {
	return &ProductsController{
		App: app,
	}
}
