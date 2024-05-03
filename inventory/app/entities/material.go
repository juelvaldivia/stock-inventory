package entities

import "github.com/google/uuid"

type Material struct {
	Id                uuid.UUID `json:"id"`
	Name              string    `json:"name"`
	ImageUri          string    `json:"imageUri"`
	Description       string    `json:"description"`
	QuantityUsed      int       `json:"quantityUsed"`
	QuantityAvailable int       `json:"quantityAvailable"`
	QuantityLimit     int       `json:"quantityLimit"`
}

type MaterialsList struct {
	TotalItems  int        `json:"totalItems"`
	TotalPages  int        `json:"totalPages"`
	CurrentPage int        `json:"currentPage"`
	PerPage     int        `json:"perPage"`
	Items       []Material `json:"items"`
}
