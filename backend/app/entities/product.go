package entities

import "github.com/google/uuid"

type Product struct {
	Id            uuid.UUID
	Name          string
	Category      string
	Price         float32
	StockQuantity int
	BrandId       uuid.UUID
}
