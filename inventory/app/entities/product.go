package entities

import "github.com/google/uuid"

type Product struct {
	Id            uuid.UUID  `json:"id"`
	BrandId       uuid.UUID  `json:"brandId"`
	Name          string     `json:"name"`
	Category      string     `json:"category"`
	Price         float32    `json:"price"`
	Style         string     `json:"style"`
	Size          string     `json:"size"`
	StockQuantity int        `json:"stockQuantity"`
	StockLimit    int        `json:"stockLimit"`
	ImageUri      string     `json:"_"`
	ImageUrl      string     `json:"imageUrl"`
	Materials     []Material `json:"materials"`
}

type ProductsList struct {
	TotalItems  int       `json:"totalItems"`
	TotalPages  int       `json:"totalPages"`
	CurrentPage int       `json:"currentPage"`
	PerPage     int       `json:"perPage"`
	Items       []Product `json:"items"`
}
