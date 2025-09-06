package model

type Payments struct {
	Id int `json:"id"`
	Month int `json:"month"`
	Total float64 `json:"total"`
	Principal float64 `json:"principal"`
	Interest float64 `json:"interest"`
	Balance float64 `json:"balance"`
}