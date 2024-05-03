package fileRepository

import "os"

type FileRepositoryInterface interface {
	Store(file *os.File, filename string, contentType string) (string, error)
	FindByURI(uri string) ([]byte, error)
	URLFromURI(baseURL string, uri string) (string, error)
}
