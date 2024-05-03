package fileRepository

import (
	"fmt"
	"strings"
)

type FileRepository struct {
	scheme string
}

func NewFileRepository(scheme string) *FileRepository {
	return &FileRepository{scheme: scheme}
}

func (fileRepository *FileRepository) buildURLFromPath(baseURL, path string) string {
	return fmt.Sprintf("%s/%s", baseURL, path)
}

func (fileRepository *FileRepository) uriScheme(uri string) string {
	parts := strings.Split(uri, "://")
	if len(parts) != 2 {
		return ""
	}

	return parts[0]
}
