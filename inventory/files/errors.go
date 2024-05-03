package fileRepository

import "fmt"

type FileRepositoryError struct {
	message string
}

func (e *FileRepositoryError) Error() string {
	return fmt.Sprintf("FileRepositoryError: %s", e.message)
}

type InvalidURI struct {
	FileRepositoryError
}

type ObjectToStoreIsNotAFile struct {
	FileRepositoryError
}

type UnsupportedScheme struct {
	FileRepositoryError
}

type LocalRepositoryError struct {
	message string
}

func (e *LocalRepositoryError) Error() string {
	return fmt.Sprintf("LocalFileRepositoryError: %s", e.message)
}

type FileAlreadyExists struct {
	LocalRepositoryError
}

type FileNotFound struct {
	LocalRepositoryError
}

type InvalidPath struct {
	LocalRepositoryError
}

type InvalidPathFormat struct {
	LocalRepositoryError
}

type UnableToStoreFile struct {
	LocalRepositoryError
}
