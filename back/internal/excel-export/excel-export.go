package excel_export

import (
	"encoding/json"
	"net/http"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation/entities"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg/calculator"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg/excel"
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

func GetExcelHandler(c echo.Context) error {
	var calcRequest *CalculationRequest
	var calcResponse CalculationResponse

	err := json.NewDecoder(c.Request().Body).Decode(&calcRequest)
	defer c.Request().Body.Close()
	if err != nil {
		http.Error(c.Response(), err.Error(), http.StatusBadRequest)
		return nil
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
		http.Error(c.Response(), err.Error(), http.StatusInternalServerError)
		return nil
	}

	c.Response().Header().Set("Content-Disposition", "attachment; filename=payments.xlsx")
	c.Response().Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	c.Response().WriteHeader(http.StatusOK)
	_, _ = c.Response().Write(fileBytes)
	return nil
}
