package models

import "time"

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
