package dashboard

import (
	"encoding/json"
	"net/http"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/models"
	"github.com/labstack/echo/v4"
)

func Create_calc_handler(c echo.Context) error {
	var request models.Create_calc_model
	err := json.NewDecoder(c.Request().Body).Decode(&request)
	if err != nil {
		http.Error(c.Response(), "Неправильный формат", http.StatusBadRequest)
		return nil
	}

	return nil
}
