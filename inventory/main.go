package main

import (
	"fmt"
	"os"
	"stock-inventory/api"
	"stock-inventory/app"
	"stock-inventory/config"
	"stock-inventory/database"
	fileRepository "stock-inventory/files"
	"stock-inventory/server"
)

func main() {
	var configPath string

	configPath = os.Getenv("CONFIG_FILE_PATH")

	if configPath == "" {
		configPath = "./config.yml"
	}

	fmt.Printf("Config path: %v\n", configPath)
	configuration, err := config.LoadConfig(configPath)

	if err != nil {
		fmt.Printf("Error loading config: %v\n", err)
		return
	}

	databaseFactory := database.NewFactory(configuration)
	database, err := databaseFactory.BuildDatabase()

	if err != nil {
		fmt.Printf("Error building database: %v\n", err)
		return
	}

	repository, err := fileRepository.NewLocalRepository("tmp/files")
	if err != nil {
		fmt.Println("Error building local file repository:", err)
		return
	}

	stockInventoryApp := app.New(configuration, database, repository)
	apiInstance := api.New(stockInventoryApp)
	server := server.NewServerHTTP(configuration.ApiPort, apiInstance.Router)

	serverError := server.Listen()

	if serverError != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
