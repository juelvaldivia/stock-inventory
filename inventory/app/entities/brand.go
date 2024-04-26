package entities

import "github.com/google/uuid"

type Brand struct {
	Id   uuid.UUID `json:"id"`
	Name string    `json:"name"`
	Logo string    `json:"logo"`
}
