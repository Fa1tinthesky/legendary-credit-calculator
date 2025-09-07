package calculator

import (
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation/entities"
	"math"
	"time"
)

type CreditCalculator struct{}

func NewCreditCalculator() *CreditCalculator {
	return &CreditCalculator{}
}

func (c *CreditCalculator) Calculate(sum float64, period int, rate float64, paymentType int, startDate string) ([]entities.PaymentSchedule, float64, float64) {
	formattedStartDate, _ := time.Parse("2006-01-02", startDate)
	switch paymentType {
	case 1:
		return c.calculateAnnuity(sum, period, rate, formattedStartDate)
	case 2:
		return c.calculateDifferentiated(sum, period, rate, formattedStartDate)
	default:
		return nil, 0, 0
	}
}

func (c *CreditCalculator) calculateAnnuity(sum float64, period int, rate float64, startDate time.Time) ([]entities.PaymentSchedule, float64, float64) {
	monthlyRate := rate / 100 / 12

	monthlyPayment := sum * (monthlyRate * math.Pow(1+monthlyRate, float64(period))) / (math.Pow(1+monthlyRate, float64(period)) - 1)

	schedule := make([]entities.PaymentSchedule, period)
	balance := sum
	totalSum := 0.0

	currentDate := startDate

	for i := 0; i < period; i++ {
		interestPayment := balance * monthlyRate
		principalPayment := monthlyPayment - interestPayment
		balance -= principalPayment

		if i == period-1 {
			principalPayment += balance
			monthlyPayment = interestPayment + principalPayment
			balance = 0
		}

		schedule[i] = entities.PaymentSchedule{
			Date:      currentDate,
			Payment:   math.Round(monthlyPayment*100) / 100,
			Body:      math.Round(principalPayment*100) / 100,
			Interest:  math.Round(interestPayment*100) / 100,
			Remainder: math.Round(balance*100) / 100,
		}

		totalSum += monthlyPayment
		currentDate = currentDate.AddDate(0, 1, 0)
	}

	return schedule, math.Round(monthlyPayment*100) / 100, math.Round(totalSum*100) / 100
}

func (c *CreditCalculator) calculateDifferentiated(sum float64, period int, rate float64, startDate time.Time) ([]entities.PaymentSchedule, float64, float64) {
	monthlyRate := rate / 100 / 12
	principalPayment := sum / float64(period)

	schedule := make([]entities.PaymentSchedule, period)
	balance := sum
	totalSum := 0.0
	firstPayment := 0.0

	currentDate := startDate

	for i := 0; i < period; i++ {
		interestPayment := balance * monthlyRate
		payment := principalPayment + interestPayment
		balance -= principalPayment

		if i == 0 {
			firstPayment = payment
		}

		schedule[i] = entities.PaymentSchedule{
			Date:      currentDate,
			Payment:   math.Round(payment*100) / 100,
			Body:      math.Round(principalPayment*100) / 100,
			Interest:  math.Round(interestPayment*100) / 100,
			Remainder: math.Round(balance*100) / 100,
		}

		totalSum += payment
		currentDate = currentDate.AddDate(0, 1, 0)
	}

	return schedule, math.Round(firstPayment*100) / 100, math.Round(totalSum*100) / 100
}
