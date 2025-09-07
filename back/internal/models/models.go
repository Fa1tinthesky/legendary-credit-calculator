package models

import (
	"time"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation/entities"
)

type Sign_up_request struct {
	Mail     string `json:"mail"`
	Login    string `json:"login"`
	Password string `json:"password"`
}

type Confirm_email_request struct {
	Mail     string `json:"mail"`
	Password string `json:"password"`
}

type Temp_user struct {
	Id             int       `json:"int"`
	Email          string    `json:"email"`
	Email_password string    `json:"email_password"`
	Login          string    `json:"login"`
	Temp_code      string    `json:"temp_code"`
	Finish_time    time.Time `json:"finish_time"`
}

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Login    string `json:"login"`
}

type Sign_out_request struct {
	Mail string `json:"mail"`
}

type Table_unit struct {
	Id     int       `json:"id"`
	Mail   string    `json:"mail"`
	Amount float64   `json:"amount"`
	Data   time.Time `json:"data"`
}

type CalculationTable struct {
	ID          uint      `json:"id" db:"id"`
	UserID      int       `json:"user_mail" db:"user_mail"`
	Name        string    `json:"name" db:"name"`
	Sum         float64   `json:"sum" db:"sum"`
	Currency    int       `json:"currency" db:"currency"`
	Period      int       `json:"period" db:"period"`
	Rate        float64   `json:"rate" db:"rate"`
	PaymentType string    `json:"payment_type" db:"payment_type"`
	StartDate   time.Time `json:"start_date" db:"start_date"`
}

type Create_calc_model struct {
	Rows   []entities.PaymentSchedule `json:"rows"`
	Cookie string                     `json:"cookies"`
}

type Get_calc_model struct {
	Object entities.PaymentSchedule `json:"object"`
}
