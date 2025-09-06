package model

type RequestForCalc struct {
	Amount float64 `json:"amount"`
	Months int `json:"months"`
	Rate float64 `json:"rate"`
	Type TypeEnum `json:"type"`
}