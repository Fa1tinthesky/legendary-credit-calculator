package excel_export

import (
	"net/http"
	"strconv"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg/calculator"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg/excel"
	"github.com/labstack/echo/v4"
)

func GetExcelHandler(c echo.Context) error {
	query := c.QueryParams()

	sum, err := strconv.ParseFloat(query.Get("sum"), 64)
	if err != nil {
		http.Error(c.Response(), "invalid type", http.StatusBadRequest)
		return nil
	}

	// TODO: add currency
	/*
		currency, err := strconv.Atoi(query.Get("currency"))
		if err != nil {
			http.Error(c.Response(), "invalid type", http.StatusBadRequest)
			return nil
		}
	*/

	period, err := strconv.Atoi(query.Get("period"))
	if err != nil {
		http.Error(c.Response(), "invalid type", http.StatusBadRequest)
		return nil
	}

	rate, err := strconv.ParseFloat(query.Get("rate"), 64)
	if err != nil {
		http.Error(c.Response(), "invalid type", http.StatusBadRequest)
		return nil
	}

	paymentType, err := strconv.Atoi(query.Get("paymentType"))
	if err != nil {
		http.Error(c.Response(), "invalid type", http.StatusBadRequest)
		return nil
	}

	startDate := query.Get("start_date")
	if startDate == "" {
		http.Error(c.Response(), "invalid type", http.StatusBadRequest)
		return nil
	}

	creditCalc := calculator.NewCreditCalculator()

	table, _, _ := creditCalc.Calculate(
		sum,
		period,
		rate,
		paymentType,
		startDate,
	)

	fileBytes, err := excel.ExportToExcel(table, "График выплат")
	if err != nil {
		http.Error(c.Response(), "failed to create excel fiel", http.StatusInternalServerError)
		return nil
	}

	c.Response().Header().Set("Content-Disposition", "attachment; filename=payments.xlsx")
	c.Response().Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	c.Response().WriteHeader(http.StatusOK)
	_, _ = c.Response().Write(fileBytes)
	return nil
}
