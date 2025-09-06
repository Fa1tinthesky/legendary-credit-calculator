package service

import (
	"fmt"
	"math"

	"github.com/Fa1tinthesky/legendary-credit-calculator.git/model"
	"github.com/xuri/excelize/v2"
	"bytes"
)

func Annuitypayment(amount float64, months int, rate float64) []model.Payments {
	r := rate / 100 / 12
	pay := amount * (r * math.Pow(1+r, float64(months))) / (math.Pow(1+r, float64(months)) - 1)

	var payments []model.Payments
	balance := amount
	for  m := 1;  m <= months;  m++ {
		interest := balance * r
		principal := pay-interest
		balance -= principal
		payments = append(payments, model.Payments{
			Month: m,
			Total: pay,
			Interest: interest,
			Principal: principal,
			Balance: math.Max(balance, 0),
		})
		
	}
	return payments
}

func DifferentiatedPayments(amount float64, months int, rate float64) []model.Payments {
	r := rate / 100 / 12
	principalPart := amount/float64(months)

	var payments []model.Payments
	balance := amount
	for  m := 1;  m <= months;  m++ {
		interest := balance * r
		total := principalPart + interest
		balance -= principalPart
		payments = append(payments, model.Payments{
			Month: m,
			Total: total,
			Interest: interest,
			Principal: principalPart,
			Balance: math.Max(balance, 0),
		})
		
	}
	return payments
} 

func ExportToExcel(payments []model.Payments, sheetName string) ([]byte, error) {
	f := excelize.NewFile()
	f.SetSheetName("Sheet1", sheetName)

	// Заголовки
	f.SetCellValue(sheetName, "A1", "Месяц")
	f.SetCellValue(sheetName, "B1", "Платеж")
	f.SetCellValue(sheetName, "C1", "Тело кредита")
	f.SetCellValue(sheetName, "D1", "Проценты")
	f.SetCellValue(sheetName, "E1", "Остаток")

	// Данные
	for i, payment := range payments {
		row := i + 2
		f.SetCellValue(sheetName, fmt.Sprintf("A%d", row), payment.Month)
		f.SetCellValue(sheetName, fmt.Sprintf("B%d", row), payment.Total)
		f.SetCellValue(sheetName, fmt.Sprintf("C%d", row), payment.Principal)
		f.SetCellValue(sheetName, fmt.Sprintf("D%d", row), payment.Interest)
		f.SetCellValue(sheetName, fmt.Sprintf("E%d", row), payment.Balance)
	}

	// Сохраняем в буфер
	var buf bytes.Buffer
	if err := f.Write(&buf); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}