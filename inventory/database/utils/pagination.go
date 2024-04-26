package utils

import (
	"errors"
	"math"
)

var (
	ErrInvalidPageNumber = errors.New("invalid page number")
	ErrInvalidPageSize   = errors.New("invalid page size")
)

type Pagination struct {
	Page    int
	PerPage int
}

func NewPagination(page, perPage int) *Pagination {
	if page <= 0 {
		page = 1
	}
	if perPage <= 0 {
		perPage = 25
	}

	return &Pagination{Page: page, PerPage: perPage}
}

func (p *Pagination) SetPage(page int) error {
	if page <= 0 {
		return ErrInvalidPageNumber
	}
	p.Page = page
	return nil
}

func (p *Pagination) SetPerPage(perPage int) error {
	if perPage <= 0 {
		return ErrInvalidPageSize
	}
	p.PerPage = perPage
	return nil
}

func (p *Pagination) Offset() int {
	return (p.Page - 1) * p.PerPage
}

func (p *Pagination) Limit() int {
	return p.PerPage
}

func (p *Pagination) CalculateTotalPages(totalItems int) int {
	if totalItems <= 0 {
		return 1
	}
	return int(math.Ceil(float64(totalItems) / float64(p.PerPage)))
}
