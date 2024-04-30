package filters

import "stock-inventory/database/utils"

type ProductsFilters struct {
	*utils.Filter
}

func NewProductsFilters() *ProductsFilters {
	return &ProductsFilters{
		Filter: utils.NewFilter(),
	}
}

func (f *ProductsFilters) ByName(name string) *ProductsFilters {
	f.Add("name", name)

	return f
}

func (f *ProductsFilters) ByCategory(category string) *ProductsFilters {
	f.Add("category", category)

	return f
}
