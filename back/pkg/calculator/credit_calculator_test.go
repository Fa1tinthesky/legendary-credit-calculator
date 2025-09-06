package calculator

import (
	"testing"
)

func TestCalculate_Annuity(t *testing.T) {
	calc := NewCreditCalculator()

	schedule, monthly, totalSum := calc.Calculate(100000, 12, 12, 1, "2025-09-10")

	if len(schedule) != 12 {
		t.Errorf("expected 12 payments, get %d", len(schedule))
	}

	if monthly <= 0 {
		t.Errorf("monthly payment cannot be less than 0, get %.2f", monthly)
	}

	expectedSum := 106618.55
	if totalSum != expectedSum {
		t.Errorf("expected total sum %.2f, get %.2f", expectedSum, totalSum)
	}

}

func TestCalculate_Differentiated(t *testing.T) {
	calc := NewCreditCalculator()

	schedule, first, totalSum := calc.Calculate(100000, 12, 12, 1, "2025-09-10")

	if len(schedule) != 12 {
		t.Errorf("expected 12 payments, get %d", len(schedule))
	}

	if first <= 0 {
		t.Errorf("first payment cannot be less than 0, get %.2f", first)
	}

	expectedSum := 106500.00
	if totalSum != expectedSum {
		t.Errorf("expected total sum %.2f, get %.2f", expectedSum, totalSum)
	}
}

func TestCalculate_InvalidType(t *testing.T) {
	calc := NewCreditCalculator()

	schedule, monthly, totalSum := calc.Calculate(100000, 12, 12, 0, "2025-09-10")

	if schedule != nil {
		t.Errorf("expected nil schedule, get %v", schedule)
	}
	if monthly != 0 {
		t.Errorf("expected 0 monthly payment, get %.2f", monthly)
	}
	if totalSum != 0 {
		t.Errorf("expected 0 total, get %.2f", totalSum)
	}
}
