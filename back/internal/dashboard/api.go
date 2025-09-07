package dashboard

import (
	"context"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/databases/db"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/models"
)

func Create_calc(request models.Create_calc_model) error {
	ctx := context.Background()
	dbd := db.DB
	rdb := db.RDB
	tx, err := dbd.Begin(ctx)
	if err != nil {
		return err
	}

	email, err := rdb.Get(ctx, request.Cookie).Result()
	if err != nil {
		return err
	}

	for _, v := range request.Rows {
		_, err = tx.Exec(ctx, `INSERT INTO table_unit(email , amount , data , interest , remainder) VALUES ($1 , $2 , $3 , $4 , $5)`,
			email, v.Body, v.Date , v.Interest , v.Remainder)
		if err != nil {
			return err
		}
	}

	return nil
}


func Get_calc(cookie string) (error , []models.Get_calc_model){
	ctx := context.Background()
	dbd := db.DB
	rdb := db.RDB

	email, err := rdb.Get(ctx, cookie).Result()
	if err != nil {
		return err , nil 
	}
	
	var reponse []models.Get_calc_model
	query , err := dbd.Query(ctx , `SELECT amount , data , interest , remainder FROM table_unit WHERE email = $1` , email)
	if err != nil{
		return err , nil 
	}

	for query.Next(){
		var unit models.Get_calc_model
		err = query.Scan(&unit.Object.) 
	}
}