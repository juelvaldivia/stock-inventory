package entities

import "github.com/google/uuid"

type User struct {
	Id              uuid.UUID `json:"id"`
	UserId          string    `json:"userId"`
	FullName        string    `json:"fullName"`
	Phone           string    `json:"phone"`
	Email           string    `json:"email"`
	Username        string    `json:"username"`
	CreatedAt       string    `json:"createdAt"`
	UpdatedAt       string    `json:"updatedAt"`
	LastSessionDate string    `json:"lastSessionDate"`
}
