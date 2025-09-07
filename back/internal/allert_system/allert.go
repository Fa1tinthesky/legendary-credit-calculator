package allertsystem

import (
	"context"
	"fmt"
	"time"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
	"gopkg.in/gomail.v2"
)

func Send_allert_messages(ctx context.Context, db *pgxpool.Pool) error {
	rows, err := db.Query(ctx, `SELECT * FROM table_unit WHERE data <= NOW()`)
	if err != nil {
		return err
	}

	for rows.Next() {
		var unit models.Table_unit
		err = rows.Scan(&unit.Id, &unit.Mail, &unit.Amount, &unit.Data)
		if err != nil {
			return err
		}

		need_date := time.Now().Add(24 * time.Hour)

		if need_date.After(unit.Data) {
			mail_meesage := fmt.Sprintf("Hello from LCC\n Tommorow you have to pay the bill for your credit: %f", unit.Amount)
			m := gomail.NewMessage()
			m.SetHeader("From", "app75490@gmail.com")
			m.SetHeader("To", unit.Mail)
			m.SetHeader("Subject", "App verification")
			m.SetBody("text/html", fmt.Sprintf(`<h1 class="header" style = "color:blue">%s</h1>`, mail_meesage))
		}
	}

	return nil
}
