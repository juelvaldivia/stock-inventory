package entities

import "github.com/google/uuid"

type Client struct {
	Id             uuid.UUID `json:"id"`
	Names          string    `json:"names"`
	FirstLastName  string    `json:"firstLastName"`
	SecondLastName string    `json:"secondLastName"`
	Address        string    `json:"address"`
	Phone          string    `json:"phone"`
	Status         string    `json:"status"`
	CreatedAt      string    `json:"createdAt"`
}
