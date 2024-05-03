package fileRepository

import (
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"regexp"
	"strings"
	"time"
)

type LocalRepository struct {
	*FileRepository
	path string
}

func NewLocalRepository(path string) (*LocalRepository, error) {
	if path == "" {
		return nil, &InvalidPath{LocalRepositoryError{"empty path"}}
	}

	if !isValidPathFormat(path) {
		return nil, &InvalidPathFormat{LocalRepositoryError{"invalid path format"}}
	}

	if !strings.HasSuffix(path, "/") {
		path += "/"
	}

	if _, err := os.Stat(path); os.IsNotExist(err) {
		if err := os.MkdirAll(path, os.ModePerm); err != nil {
			return nil, &InvalidPath{LocalRepositoryError{"unable to create directory"}}
		}
	}

	return &LocalRepository{FileRepository: NewFileRepository("file"), path: path}, nil
}

func (localRepository *LocalRepository) Store(file *os.File, filename string, contentType string) (string, error) {
	if file == nil {
		return "", &ObjectToStoreIsNotAFile{FileRepositoryError{"file is nil"}}
	}

	timeInNanoseconds := time.Now().UnixNano()
	filename = fmt.Sprintf("%d_%s", timeInNanoseconds, filename)
	uri := localRepository.buildFileURI(filename)

	path := localRepository.buildPathFromURI(uri)
	if _, err := os.Stat(path); err == nil {
		return "", &FileAlreadyExists{LocalRepositoryError{"file already exists"}}
	}

	if err := localRepository.writeFile(file, path, contentType); err != nil {
		return "", err
	}

	return uri, nil
}

func (localRepository *LocalRepository) FindByURI(uri string) ([]byte, error) {
	scheme := localRepository.uriScheme(uri)

	if scheme != localRepository.FileRepository.scheme {
		return nil, &UnsupportedScheme{FileRepositoryError{"unsupported scheme"}}
	}

	return localRepository.readFile(uri)
}

func (localRepository *LocalRepository) URLFromURI(baseURL string, uri string) (string, error) {
	scheme := localRepository.uriScheme(uri)

	if scheme != localRepository.FileRepository.scheme {
		return "", &UnsupportedScheme{FileRepositoryError{"unsupported scheme"}}
	}

	path := localRepository.buildPathFromURI(uri)

	return localRepository.buildURLFromPath(baseURL, path), nil
}

func (localRepository *LocalRepository) buildFileURI(filename string) string {
	return fmt.Sprintf("file://%s%s", localRepository.path, filename)
}

func (localRepository *LocalRepository) buildPathFromURI(uri string) string {
	parts := strings.Split(uri, "://")
	if len(parts) != 2 {
		return ""
	}

	return parts[1]
}

func (lr *LocalRepository) writeFile(file *os.File, path string, contentType string) error {
	_, err := file.Seek(0, 0)
	if err != nil {
		return err
	}

	outFile, err := os.Create(path)
	if err != nil {
		return &UnableToStoreFile{LocalRepositoryError{err.Error()}}
	}
	defer outFile.Close()

	_, err = io.Copy(outFile, file)
	if err != nil {
		return &UnableToStoreFile{LocalRepositoryError{err.Error()}}
	}

	if err := os.Setenv("CONTENT_TYPE", contentType); err != nil {
		return err
	}

	return nil
}

func (localRepository *LocalRepository) readFile(uri string) ([]byte, error) {
	filePath := strings.TrimPrefix(uri, "file://")

	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil, &FileNotFound{LocalRepositoryError{"file not found"}}
		}

		return nil, err
	}

	return content, nil
}

func isValidPathFormat(path string) bool {
	var pathPattern = regexp.MustCompile(`^[\w/-]+$`)

	return pathPattern.MatchString(path)
}
