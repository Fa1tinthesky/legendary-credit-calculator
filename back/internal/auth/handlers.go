package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/databases/db"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/models"
	"github.com/labstack/echo/v4"
)

type Dodi struct {
	Status *string `json:"status"`
}

func Sign_up_handler(c echo.Context) error {
	db := db.DB
	var request models.Sign_up_request
	err := json.NewDecoder(c.Request().Body).Decode(&request)
	if err != nil {
		http.Error(c.Response().Writer, "Неправильный формат данных", http.StatusBadRequest)
		return nil
	}

	err = Sign_up(db, request)
	if err != nil {
		if errors.Is(err, ErrUserExists) {
			http.Error(c.Response(), "Такой пользователь уже существует", http.StatusBadRequest)
			return nil
		} else {
			http.Error(c.Response().Writer, "Ошибка сервера", http.StatusInternalServerError)
			fmt.Println(err)
			return nil
		}
	}

	c.Response().Write([]byte("Отправлен код подтверждения на почту"))
	return nil
}

func Confirm_email_handler(c echo.Context) error {
	db := db.DB
	var request models.Confirm_email_request
	err := json.NewDecoder(c.Request().Body).Decode(&request)
	if err != nil {
		http.Error(c.Response(), "Неправильный формат данных", http.StatusBadRequest)
		return nil
	}

	err = Confirm_email(db, request)
	if err != nil {
		if errors.Is(err, ErrIncorrectCode) {
			http.Error(c.Response(), "Неправильный пароль", http.StatusBadRequest)
			return nil
		} else {
			http.Error(c.Response(), "Ошибка сервера", http.StatusInternalServerError)
			fmt.Println(err)
			return nil
		}
	}
	c.Response().Write([]byte("Пользователь зарегистрирован"))
	return nil
}

func Sign_in_handler(c echo.Context) error {
	fmt.Println("Зашел")
	dbd := db.DB
	rdb := db.RDB
	var request models.Confirm_email_request
	err := json.NewDecoder(c.Request().Body).Decode(&request)
	if err != nil {
		http.Error(c.Response(), "Неправильный формат данных", http.StatusBadRequest)
		return nil
	}
	fmt.Println("Дошел 1")
	err, cookie, str := Sign_in(dbd, rdb, request)
	fmt.Println("Дошел 2")
	if err != nil {
		if err == ErrIncorrectPassword || err == ErrNonExistingUser {
			http.Error(c.Response(), "Неправильный пароль", http.StatusBadRequest)
			return nil
		} else {
			fmt.Println(err)
			http.Error(c.Response(), "Ошибка сервера", http.StatusInternalServerError)
			return nil
		}
	}

	http.SetCookie(c.Response(), cookie)
	c.Response().Writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(c.Response()).Encode(&Dodi{
		Status: str,
	})
	return nil
}

func Sign_out_handler(c echo.Context) error {
	rdb := db.RDB

	var request models.Sign_out_request
	err := json.NewDecoder(c.Request().Body).Decode(&request)
	if err != nil {
		http.Error(c.Response(), "Неправильный формат данных", http.StatusBadRequest)
		return nil
	}

	cookie, err := Sign_out(rdb, request.Mail)
	if err != nil {
		if err != ErrIncorrectCookie {
			http.Error(c.Response(), "Не существующий пользователь", http.StatusBadRequest)
			return nil
		} else {
			http.Error(c.Response(), "Ошибка сервера", http.StatusInternalServerError)
			fmt.Println(err)
			return nil
		}
	}
	http.SetCookie(c.Response(), cookie)
	c.Response().Write([]byte("Успешно выполнен выход"))
	return nil
}
