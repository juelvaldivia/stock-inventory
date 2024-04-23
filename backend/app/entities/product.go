package entities

import "github.com/google/uuid"

type Product struct {
	Id            uuid.UUID `json:"id"`
	Name          string    `json:"name"`
	Category      string    `json:"category"`
	Price         float32   `json:"price"`
	StockQuantity int       `json:"stockQuantity"`
	BrandId       uuid.UUID `json:"brandId"`
}

type ProductsList struct {
	TotalItems  int       `json:"totalItems"`
	TotalPages  int       `json:"totalPages"`
	CurrentPage int       `json:"currentPage"`
	PerPage     int       `json:"perPage"`
	Items       []Product `json:"items"`
}
