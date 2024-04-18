package app

import (
	"stock-inventory/config"
	"stock-inventory/database/interfaces"
)

type App struct {
	Config   config.Config
	Database interfaces.Database
}

func New(configuration config.Config, database interfaces.Database) *App {
	return &App{
		Config:   configuration,
		Database: database,
	}
}
