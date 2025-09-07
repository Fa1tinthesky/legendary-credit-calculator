package allertsystem

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"gopkg.in/gomail.v2"
)

type Alert struct {
	Mail string    `json:"email"`
	Body float64   `json:"body"`
	Data time.Time `json:"data"`
}

func Send_allert_messages(db *pgxpool.Pool) error {
	ctx := context.Background()
	rows, err := db.Query(ctx, `SELECT email , body , data FROM table_unit WHERE data <= NOW()`)
	if err != nil {
		return err
	}

	for rows.Next() {
		var unit Alert
		err = rows.Scan(&unit.Mail, &unit.Body, &unit.Data)
		if err != nil {
			return err
		}

		need_date := time.Now().Add(754 * time.Hour)

		if need_date.After(unit.Data) {
			mail_meesage := fmt.Sprintf("Hello from LCC\n Tommorow you have to pay the bill for your credit: %f", unit.Body)
			m := gomail.NewMessage()
			m.SetHeader("From", "app75490@gmail.com")
			m.SetHeader("To", unit.Mail)
			m.SetHeader("Subject", "App verification")
			m.SetBody("text/html", fmt.Sprintf(`<h1 class="header" styale = "color:blue">%s</h1>`, mail_meesage))
			send := gomail.NewDialer("smtp.gmail.com", 587, "app75490@gmail.com", "znvh weto comb wkkd ")
			_ = send.DialAndSend(m)
		}
	}

	return nil
}
