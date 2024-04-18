package config

import (
	errors "errors"
	fmt "fmt"
	"io/ioutil"
	"os"
	"strings"

	viper "github.com/spf13/viper"
)

var (
	FailedReadConfigFile      = errors.New("failed to read config file")
	FailedBuildConfig         = errors.New("failed to unmarshal config")
	MissingDatabaseConfigKeys = errors.New("missing required keys in sql_database configuration")
)

type Config struct {
	ApiPort        int       `mapstructure:"api_port"`
	DatabaseDriver string    `mapstructure:"database_driver"`
	SQLDatabase    SQLConfig `mapstructure:"sql_database"`
}

type SQLConfig struct {
	Host     string `mapstructure:"host"`
	Port     int    `mapstructure:"port"`
	Database string `mapstructure:"database"`
	User     string `mapstructure:"user"`
	Password any    `mapstructure:"password"`
}

func LoadConfig(configPath string) (Config, error) {
	var configuration Config

	if err := readAndUnmarshalConfig(configPath, &configuration); err != nil {
		return Config{}, err
	}

	if configuration.DatabaseDriver == "sql" {
		if err := validateSQLDatabaseConfig(configuration.SQLDatabase); err != nil {
			return Config{}, err
		}
	}

	return configuration, nil
}

func readAndUnmarshalConfig(configPath string, configuration *Config) error {
	yamlContent, err := ioutil.ReadFile(configPath)
	if err != nil {
		fmt.Printf("Error al leer el archivo de configuración: %v\n", err)
		return err
	}

	yamlString := string(yamlContent)
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		key := "$" + pair[0]
		value := pair[1]
		yamlString = strings.ReplaceAll(yamlString, key, value)
	}

	tmpfile, err := ioutil.TempFile("", "config.*.yml")
	if err != nil {
		fmt.Printf("Error al crear el archivo temporal: %v\n", err)
		return err
	}
	defer os.Remove(tmpfile.Name())

	if _, err := tmpfile.Write([]byte(yamlString)); err != nil {
		fmt.Printf("Error al escribir en el archivo temporal: %v\n", err)
		return err
	}
	if err := tmpfile.Close(); err != nil {
		fmt.Printf("Error al cerrar el archivo temporal: %v\n", err)
		return err
	}

	viper.SetConfigFile(tmpfile.Name())
	viper.SetConfigType("yaml")

	if err := viper.ReadInConfig(); err != nil {
		return fmt.Errorf("%w: %v", FailedReadConfigFile, err)
	}

	if err := viper.Unmarshal(configuration); err != nil {
		return fmt.Errorf("%w: %v", FailedBuildConfig, err)
	}

	return nil
}

func validateSQLDatabaseConfig(sqlConfig SQLConfig) error {
	if sqlConfig.Host == "" ||
		sqlConfig.Port == 0 ||
		sqlConfig.User == "" ||
		sqlConfig.Database == "" ||
		(sqlConfig.Password != nil && sqlConfig.Password == "") {
		return fmt.Errorf("%w expected: %v", MissingDatabaseConfigKeys, expectDatabaseConfig())
	}

	return nil
}

func expectDatabaseConfig() string {
	return `
	sql_database:
  	  host: localhost
  	  port: 5432
  	  database: your_database
  	  user: your_username
  	  password: your_password
	`
}
