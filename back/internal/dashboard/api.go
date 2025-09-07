package dashboard

import (
	"context"
	"fmt"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/databases/db"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/models"
	"github.com/redis/go-redis/v9"
)

func Create_calc(request models.Create_calc_model, cookie string) error {
	ctx := context.Background()
	dbd := db.DB
	rdb := db.RDB
	tx, err := dbd.Begin(ctx)
	if err != nil {
		fmt.Println(1)
		return err
	}
	email, err := rdb.Get(ctx, cookie).Result()
	fmt.Println(email)
	if err == redis.Nil {
		fmt.Println("Ключ не найден")
	} else if err != nil {
		fmt.Println("Ошибка:", err)
	} else {
		fmt.Println("Значение:", email)
	}

	for _, v := range request.Rows {
		_, err = tx.Exec(ctx, `INSERT INTO table_unit(email , amount , data , interest , remainder) VALUES ($1 , $2 , $3 , $4 , $5)`,
			email, v.Body, v.Date, v.Interest, v.Remainder)
		if err != nil {
			fmt.Println(3)
			return err
		}
	}

	tx.Commit(ctx)

	return nil
}

func Get_calc(cookie string) (error, []models.Get_calc_model) {
	ctx := context.Background()
	dbd := db.DB
	rdb := db.RDB

	email, err := rdb.Get(ctx, cookie).Result()
	if err != nil {
		return err, nil
	}

	var response []models.Get_calc_model
	query, err := dbd.Query(ctx, `SELECT amount , data , interest , remainder FROM table_unit WHERE email = $1`, email)
	if err != nil {
		return err, nil
	}

	for query.Next() {
		var unit models.Get_calc_model
		err = query.Scan(&unit.Object.Payment, &unit.Object.Date, &unit.Object.Interest, &unit.Object.Remainder)
		if err != nil {
			return err, nil
		}
		response = append(response, unit)
	}

	return nil, response
}
