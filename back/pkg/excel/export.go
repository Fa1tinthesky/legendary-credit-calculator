package excel

import (
	"bytes"
	"fmt"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation/entities"
	"github.com/xuri/excelize/v2"
)

func ExportToExcel(payments []entities.PaymentSchedule, sheetName string) ([]byte, error) {
	f := excelize.NewFile()
	f.SetSheetName("Sheet1", sheetName)

	f.SetCellValue(sheetName, "A1", "Месяц")
	f.SetCellValue(sheetName, "B1", "Платеж")
	f.SetCellValue(sheetName, "C1", "Тело кредита")
	f.SetCellValue(sheetName, "D1", "Проценты")
	f.SetCellValue(sheetName, "E1", "Остаток")

	for i, payment := range payments {
		row := i + 2
		f.SetCellValue(sheetName, fmt.Sprintf("A%d", row), payment.Date.Format("01.02.2006"))
		f.SetCellValue(sheetName, fmt.Sprintf("B%d", row), payment.Payment)
		f.SetCellValue(sheetName, fmt.Sprintf("C%d", row), payment.Body)
		f.SetCellValue(sheetName, fmt.Sprintf("D%d", row), payment.Interest)
		f.SetCellValue(sheetName, fmt.Sprintf("E%d", row), payment.Remainder)
	}

	var buf bytes.Buffer
	if err := f.Write(&buf); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
