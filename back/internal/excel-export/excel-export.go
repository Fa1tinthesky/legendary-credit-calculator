package excel_export

import (
	"encoding/json"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation/entities"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg/calculator"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg/excel"
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

func GetExcelHandler(w http.ResponseWriter, r *http.Request) {
	var calcRequest *CalculationRequest
	var calcResponse CalculationResponse

	err := json.NewDecoder(r.Body).Decode(&calcRequest)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	creditCalc := calculator.NewCreditCalculator()

	calcResponse.Table, _, _ = creditCalc.Calculate(
		calcRequest.Sum,
		calcRequest.Period,
		calcRequest.Rate,
		calcRequest.PaymentType,
		calcRequest.StartDate,
	)

	fileBytes, err := excel.ExportToExcel(calcResponse.Table, "График выплат")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Disposition", "attachment; filename=payments.xlsx")
	w.Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(fileBytes)
}
