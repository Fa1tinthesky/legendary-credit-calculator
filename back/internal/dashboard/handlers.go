package dashboard

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sort"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/models"
	"github.com/labstack/echo/v4"
)

type Get_cookie struct {
	Cookie string `json:"cookie"`
}

func Create_calc_handler(c echo.Context) error {
	var request models.Create_calc_model
	err := json.NewDecoder(c.Request().Body).Decode(&request)
	if err != nil {
		http.Error(c.Response(), "Неправильный формат", http.StatusBadRequest)
		return nil
	}
	err = Create_calc(request, request.Cookie)
	if err != nil {
		http.Error(c.Response(), "Ошибка сервера", http.StatusInternalServerError)
		fmt.Println(err)
		return nil
	}

	return nil
}

func Get_calc_handler(c echo.Context) error {
	var request Get_cookie
	err := json.NewDecoder(c.Request().Body).Decode(&request)
	if err != nil {
		http.Error(c.Response(), "Неправильный формат", http.StatusBadRequest)
		return nil
	}

	err, response := Get_calc(request.Cookie)
	if err != nil {
		http.Error(c.Response(), "Ошибка сервера", http.StatusInternalServerError)
		return nil
	}
	sort.Slice(response, func(i, j int) bool {
		return response[i].Object.Date.After(response[j].Object.Date)
	})

	c.Response().Header().Set("Content-Type", "application/json")
	json.NewEncoder(c.Response()).Encode(response)

	return nil
}
