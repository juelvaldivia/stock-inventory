package products

import (
	"errors"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"stock-inventory/app/entities"
	"stock-inventory/database/interfaces"
	fileRepository "stock-inventory/files"
	"strings"
)

var ErrFileIsNotAnImage = errors.New("error file is not an image")
var ErrCreatingTemporaryFile = errors.New("error creating temporary file")
var ErrCopyFileContents = errors.New("error copying file contents")
var ErrDeletingLastFile = errors.New("error deleting last file")

func UploadImage(
	database interfaces.Database,
	fileRepository fileRepository.FileRepositoryInterface,
	file multipart.File,
	fileHeader *multipart.FileHeader,
	product entities.Product,
) error {
	contentType := fileHeader.Header.Get("Content-Type")

	if !isImage(contentType) {
		return ErrFileIsNotAnImage
	}

	tempFile, err := ioutil.TempFile("", fileHeader.Filename)
	if err != nil {
		return ErrCreatingTemporaryFile
	}
	defer os.Remove(tempFile.Name())

	_, err = io.Copy(tempFile, file)
	if err != nil {
		return ErrCopyFileContents
	}

	uri, err := fileRepository.Store(tempFile, fileHeader.Filename, contentType)
	if err != nil {
		return err
	}

	err = database.Products().UpdateImage(product, uri)
	if err != nil {
		return err
	}

	lastImagePath := strings.TrimPrefix(product.ImageUri, "file://")
	if err := os.Remove(lastImagePath); err != nil && !os.IsNotExist(err) {
		return ErrDeletingLastFile
	}

	return nil
}

func isImage(fileType string) bool {
	switch fileType {
	case "image/jpeg", "image/png":
		return true
	default:
		return false
	}
}
