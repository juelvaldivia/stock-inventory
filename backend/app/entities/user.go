package entities

import "github.com/google/uuid"

type User struct {
	Id              uuid.UUID
	UserId          string
	FullName        string
	Phone           string
	Email           string
	Username        string
	CreatedAt       string
	UpdatedAt       string
	LastSessionDate string
}
