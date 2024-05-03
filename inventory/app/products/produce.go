package products

import (
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
)

func Produce(database interfaces.Database, product entities.Product) (entities.Product, error) {
	product, err := database.Products().FindById(product.Id)
	if err != nil {
		return entities.Product{}, err
	}

	materials, err := database.Materials().FindByProduct(product)
	if err != nil {
		return entities.Product{}, err
	}

	for _, material := range materials {
		materialFound, err := database.Materials().FindById(material.Id)
		if err != nil {
			return entities.Product{}, err
		}

		newQuantityAvailable := materialFound.QuantityAvailable - material.QuantityUsed

		_, errUpdateMaterialQuantity := database.Materials().UpdateQuantityAvailable(
			materialFound,
			newQuantityAvailable,
		)
		if errUpdateMaterialQuantity != nil {
			return entities.Product{}, errUpdateMaterialQuantity
		}
	}

	newStockQuantity := product.StockQuantity + 1

	_, errUpdateStock := database.Products().UpdateStockQuantity(product, newStockQuantity)
	if errUpdateStock != nil {
		return entities.Product{}, errUpdateStock
	}

	product, _err := database.Products().FindById(product.Id)
	if _err != nil {
		return entities.Product{}, _err
	}

	materialsUpdated, _err := database.Materials().FindByProduct(product)
	if _err != nil {
		return entities.Product{}, _err
	}

	product.Materials = materialsUpdated

	return product, nil
}
