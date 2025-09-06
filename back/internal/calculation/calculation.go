package calculation

import (
	"encoding/json"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation/entities"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg/calculator"
	"net/http"
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

func CalculateHandler(w http.ResponseWriter, r *http.Request) {
	var calcRequest *CalculationRequest
	var calcResponse CalculationResponse

	err := json.NewDecoder(r.Body).Decode(&calcRequest)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	creditCalc := calculator.NewCreditCalculator()

	calcResponse.Table, calcResponse.Monthly, calcResponse.Sum = creditCalc.Calculate(
		calcRequest.Sum,
		calcRequest.Period,
		calcRequest.Rate,
		calcRequest.PaymentType,
		calcRequest.StartDate,
	)

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(calcResponse); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
