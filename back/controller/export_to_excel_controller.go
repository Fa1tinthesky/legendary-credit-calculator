package controller

import (
	"encoding/json"
	"net/http"

	"github.com/Fa1tinthesky/legendary-credit-calculator.git/model"
	"github.com/Fa1tinthesky/legendary-credit-calculator.git/service"
)

func GetExcel(w http.ResponseWriter, r *http.Request) {
	var req model.RequestForCalc
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request: "+err.Error(), http.StatusBadRequest)
		return
	}

	var payments []model.Payments
	switch req.Type {
	case model.Annuity:
		payments = service.Annuitypayment(req.Amount, req.Months, req.Rate)
	case model.Differential:
		payments = service.DifferentiatedPayments(req.Amount, req.Months, req.Rate)
	default:
		http.Error(w, "choose one of the options (annuity / differential)", http.StatusBadRequest)
		return
	}

	// Генерируем Excel файл
	fileBytes, err := service.ExportToExcel(payments, "Sheet1")
	if err != nil {
		http.Error(w, "failed to export: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Отправляем клиенту на скачивание
	w.Header().Set("Content-Disposition", "attachment; filename=payments.xlsx")
	w.Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(fileBytes)
}