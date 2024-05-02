package filters

import "stock-inventory/database/utils"

type MaterialsFilters struct {
	*utils.Filter
}

func NewMaterialsFilters() *MaterialsFilters {
	return &MaterialsFilters{
		Filter: utils.NewFilter(),
	}
}

func (f *MaterialsFilters) ByName(name string) *MaterialsFilters {
	f.Add("name", name)

	return f
}

func (f *MaterialsFilters) ByCategory(category string) *MaterialsFilters {
	f.Add("category", category)

	return f
}
