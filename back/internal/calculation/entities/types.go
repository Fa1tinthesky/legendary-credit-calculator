package entities

import "time"

type Calculation struct {
	ID              uint              `json:"id" db:"id"`
	UserMail        string            `json:"user_mail" db:"user_mail"`
	Name            string            `json:"name" db:"name"`
	Sum             float64           `json:"sum" db:"sum"`
	Period          int               `json:"period" db:"period"`
	Rate            float64           `json:"rate" db:"rate"`
	PaymentType     string            `json:"payment_type" db:"payment_type"`
	StartDate       time.Time         `json:"start_date" db:"start_date"`
	MonthlyPayment  float64           `json:"monthly_payment" db:"monthly_payment"`
	TotalAmount     float64           `json:"total_amount" db:"total_amount"`
	PaymentSchedule []PaymentSchedule `json:"payment_schedule" db:"-"`
}

type PaymentSchedule struct {
	Date      time.Time `json:"date" db:"date"`
	Payment   float64   `json:"payment" db:"payment"`
	Body      float64   `json:"body" db:"body"`
	Interest  float64   `json:"interest" db:"interest"`
	Remainder float64   `json:"remainder" db:"remainder"`
}
