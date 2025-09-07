package dashboard

import "github.com/Fa1tinthesky/legendary-credit-calculator/backend/databases/db"

func Get_calc(email string) {
	db := db.DB
	resp, err := db.Query(`SELECT * FROM`)
}
