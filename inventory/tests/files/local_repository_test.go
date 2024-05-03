package fileRepository

import (
	"os"
	"path/filepath"
	fileRepository "stock-inventory/files"
	"strings"
	"testing"
)

func TestNewLocalRepository_WithValidPath(t *testing.T) {
	path := "data"
	expectedError := false

	_, err := fileRepository.NewLocalRepository(path)

	if (err != nil) != expectedError {
		t.Errorf("NewLocalRepository(%s) expected error: %t, got error: %v", path, expectedError, err)
	}
}

func TestNewLocalRepository_WithEmptyPath(t *testing.T) {
	path := ""
	expectedError := true

	_, err := fileRepository.NewLocalRepository(path)

	if (err != nil) != expectedError {
		t.Errorf("NewLocalRepository(%s) expected error: %t, got error: %v", path, expectedError, err)
	}
}

func TestNewLocalRepository_WithInvalidPath(t *testing.T) {
	path := "invalid path"
	expectedError := true

	_, err := fileRepository.NewLocalRepository(path)

	if (err != nil) != expectedError {
		t.Errorf("NewLocalRepository(%s) expected error: %t, got error: %v", path, expectedError, err)
	}
}

func TestLocalRepository_Store_ExistingFile(t *testing.T) {
	dir, err := os.Getwd()
	if err != nil {
		t.Fatalf("Error getting actual directory: %v", err)
		return
	}
	dataDirectory := filepath.Join(dir, "data")

	localRepository, err := fileRepository.NewLocalRepository(dataDirectory)
	if err != nil {
		t.Fatalf("Error creating local repository: %v", err)
	}

	file, err := os.Open("data/test_file.txt")
	if err != nil {
		t.Fatalf("Error opening existing file: %v", err)
	}
	defer file.Close()

	uri, err := localRepository.Store(file, "new_test_file.txt", "text/plain")
	if err != nil {
		t.Errorf("LocalRepository.Store() returned unexpected error for existing file: %v", err)
	}

	filePath := strings.TrimPrefix(uri, "file://")

	if err := os.Remove(filePath); err != nil && !os.IsNotExist(err) {
		t.Fatalf("Error removing test file: %v", err)
	}
}

func TestLocalRepository_Store_NonExistingFile(t *testing.T) {
	localRepository, err := fileRepository.NewLocalRepository("data/")
	if err != nil {
		t.Fatalf("Error creating local repository: %v", err)
	}

	file, _ := os.Open("non_existent_file.txt")

	defer file.Close()

	_, err = localRepository.Store(file, "non_existent_file.txt", "text/plain")
	if err == nil {
		t.Errorf("LocalRepository.Store() expected error for non-existent file, but got nil")
	}
}

func TestLocalRepository_FindByURI_ExistingFile(t *testing.T) {
	dir, err := os.Getwd()
	if err != nil {
		t.Fatalf("Error getting actual directory: %v", err)
		return
	}
	dataDirectory := filepath.Join(dir, "data")

	localRepository, err := fileRepository.NewLocalRepository(dataDirectory)
	if err != nil {
		t.Fatalf("Error creating local repository: %v", err)
	}

	file, err := os.Open("data/test_file.txt")
	if err != nil {
		t.Fatalf("Error opening existing file: %v", err)
	}
	defer file.Close()

	uri, err := localRepository.Store(file, "new_test_file.txt", "text/plain")
	if err != nil {
		t.Fatalf("Error storing file: %v", err)
	}

	content, err := localRepository.FindByURI(uri)
	if err != nil {
		t.Errorf("LocalRepository.FindByURI() returned unexpected error for existing file: %v", err)
	}

	if !strings.Contains(string(content), "this only test") {
		t.Errorf("Content of file is incorrect")
	}

	filePath := strings.TrimPrefix(uri, "file://")

	if err := os.Remove(filePath); err != nil && !os.IsNotExist(err) {
		t.Fatalf("Error removing test file: %v", err)
	}
}

func TestLocalRepository_URLFromURI_ExistingFile(t *testing.T) {
	localRepository, err := fileRepository.NewLocalRepository("data")
	if err != nil {
		t.Fatalf("Error creating local repository: %v", err)
	}

	file, err := os.Open("data/test_file.txt")
	if err != nil {
		t.Fatalf("Error opening existing file: %v", err)
	}
	defer file.Close()

	uri, err := localRepository.Store(file, "new_test_file.txt", "text/plain")
	if err != nil {
		t.Fatalf("Error storing file: %v", err)
	}

	url, err := localRepository.URLFromURI("http://localhost:8080", uri)
	if err != nil {
		t.Fatalf("Error converting URI to URL: %v", err)
	}

	if !strings.Contains(url, "http://localhost:8080/data") {
		t.Errorf("Content of file is incorrect")
	}

	filePath := strings.TrimPrefix(uri, "file://")

	if err := os.Remove(filePath); err != nil && !os.IsNotExist(err) {
		t.Fatalf("Error removing test file: %v", err)
	}
}
