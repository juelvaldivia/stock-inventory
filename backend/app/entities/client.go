package entities

import "github.com/google/uuid"

type Client struct {
	Id             uuid.UUID
	Names          string
	FirstLastName  string
	SecondLastName string
	Address        string
	Phone          string
	Status         string
	CreatedAt      string
}
