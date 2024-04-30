package utils

type FiltersError struct {
	message string
}

func NewFiltersError(message string) *FiltersError {
	return &FiltersError{message: message}
}

func (e *FiltersError) Error() string {
	return e.message
}

type NoFilterSet struct {
	*FiltersError
}

func NewNoFilterSet(name string) *NoFilterSet {
	return &NoFilterSet{NewFiltersError("No filter set for " + name)}
}

type FilterItem struct {
	Field string
	Value string
}

type Filter struct {
	filters []*FilterItem
}

func NewFilter() *Filter {
	return &Filter{
		filters: make([]*FilterItem, 0),
	}
}

func (f *Filter) Add(name, value string) *Filter {
	f.filters = append(f.filters, &FilterItem{Field: name, Value: value})
	return f
}

func (f *Filter) Has(name string) bool {
	_, err := f.find(name)
	return err == nil
}

func (f *Filter) Get(name string) (string, error) {
	item, err := f.find(name)
	if err != nil {
		return "", err
	}
	return item.Value, nil
}

func (f *Filter) Each(callback func(name, value string, index int)) {
	for index, item := range f.filters {
		callback(item.Field, item.Value, index)
	}
}

func (f *Filter) find(name string) (*FilterItem, error) {
	for _, item := range f.filters {
		if item.Field == name {
			return item, nil
		}
	}
	return nil, NewNoFilterSet(name)
}
