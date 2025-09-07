package calculation

import (
	"encoding/json"
	"net/http"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation/entities"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg/calculator"
	"github.com/labstack/echo/v4"
)

type CalculationRequest struct {
	Sum         float64 `json:"sum"`
	Currency    int     `json:"currency"`
	Period      int     `json:"period"`
	Rate        float64 `json:"rate"`
	PaymentType int     `json:"type"`
	StartDate   string  `json:"start_date"`
}

type CalculationResponse struct {
	Table   []entities.PaymentSchedule `json:"table"`
	Monthly float64                    `json:"monthly"`
	Sum     float64                    `json:"sum"`
}

func CalculateHandler(c echo.Context) error {
	var calcRequest *CalculationRequest
	var calcResponse CalculationResponse

	err := json.NewDecoder(c.Request().Body).Decode(&calcRequest)
	defer c.Request().Body.Close()
	if err != nil {
		http.Error(c.Response(), err.Error(), http.StatusBadRequest)
	}

	creditCalc := calculator.NewCreditCalculator()

	calcResponse.Table, calcResponse.Monthly, calcResponse.Sum = creditCalc.Calculate(
		calcRequest.Sum,
		calcRequest.Period,
		calcRequest.Rate,
		calcRequest.PaymentType,
		calcRequest.StartDate,
	)

	c.Response().Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(c.Response()).Encode(calcResponse); err != nil {
		http.Error(c.Response(), err.Error(), http.StatusInternalServerError)
	}
	return nil
}
