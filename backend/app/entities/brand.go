package entities

import "github.com/google/uuid"

type Brand struct {
	Id   uuid.UUID
	Name string
	Logo string
}
