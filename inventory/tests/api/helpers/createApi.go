package helpers

import (
	"stock-inventory/api"
	"stock-inventory/app"
	"stock-inventory/app/entities"
	"stock-inventory/config"
	"stock-inventory/database"
	"stock-inventory/files"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockApp struct {
	mock.Mock
}

func (m *MockApp) FindAllUsers() ([]entities.User, error) {
	args := m.Called()
	return args.Get(0).([]entities.User), args.Error(1)
}

func CreateAPI(t *testing.T) *api.API {
	testConfig := config.Config{DatabaseDriver: "memory"}
	databaseFactory := database.NewFactory(testConfig)

	database, err := databaseFactory.BuildDatabase()
	assert.NoError(t, err, "Error building database")

	repository, err := fileRepository.NewLocalRepository("/inventory/")
	assert.NoError(t, err, "Error building repository")

	app := app.New(testConfig, database, repository)

	return api.New(app)
}

func CreateAPIWithApp(t *testing.T, app *app.App) *api.API {
	return api.New(app)
}
