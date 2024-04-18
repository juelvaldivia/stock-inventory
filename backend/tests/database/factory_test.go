package database

import (
	"testing"

	"stock-inventory/config"
	"stock-inventory/database"
	"stock-inventory/database/memory"

	"github.com/stretchr/testify/assert"
)

func TestBuildDatabaseWithMemoryDriver(t *testing.T) {
	testConfig := config.Config{
		DatabaseDriver: "memory",
	}

	factory := database.NewFactory(testConfig)

	database, err := factory.BuildDatabase()
	assert.NoError(t, err, "Error building database")

	assert.IsType(
		t,
		&memory.MemoryDatabase{},
		database,
		"Expected MemoryDatabase, got different type",
	)
}

// func TestBuildDatabaseWithSQLDriver(t *testing.T) {
// 	// TODO: Implement SQL config
// 	testConfig := config.Config{
// 		DatabaseDriver: "sql",
// 		SQLDatabase:    config.SQLConfig{},
// 	}

// 	factory := database.NewFactory(testConfig)

// 	database, err := factory.BuildDatabase()
// 	assert.NoError(t, err, "Error building database")

// 	assert.IsType(t, &sql.SqlDatabase{}, database, "Expected SQLDatabase, got different type")
// }

func TestBuildDatabaseWithUnsupportedDriver(t *testing.T) {
	testConfig := config.Config{
		DatabaseDriver: "unsupported",
	}

	factory := database.NewFactory(testConfig)

	_, err := factory.BuildDatabase()

	assert.ErrorIs(t, err, database.UnsupportedDatabase, "Expected UnsupportedDatabase error, got different error or no error")
}
