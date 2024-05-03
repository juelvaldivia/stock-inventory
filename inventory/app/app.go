package app

import (
	"stock-inventory/config"
	"stock-inventory/database/interfaces"
	"stock-inventory/files"
)

type App struct {
	Config         config.Config
	Database       interfaces.Database
	FileRepository fileRepository.FileRepositoryInterface
}

func New(
	configuration config.Config,
	database interfaces.Database,
	fileRepository fileRepository.FileRepositoryInterface,
) *App {
	return &App{
		Config:         configuration,
		Database:       database,
		FileRepository: fileRepository,
	}
}
