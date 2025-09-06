package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

func Sign_up_handler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
		defer cancel()

		var request models.Sign_up_request
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Неправильный формат данных", http.StatusBadRequest)
			return
		}

		err = Sign_up(ctx, db, request)
		if err != nil {
			if errors.Is(err, ErrUserExists) {
				http.Error(w, "Такой пользователь уже существует", http.StatusBadRequest)
				return
			} else {
				http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
				fmt.Println(err)
				return
			}
		}

		w.Write([]byte("Отправлен код подтверждения на почту"))
	}
}

func Confirm_email_handler(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
		defer cancel()

		var request models.Confirm_email_request
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Неправильный формат данных", http.StatusBadRequest)
			return
		}

		err = Confirm_email(ctx, db, request)
		if err != nil {
			if errors.Is(err, ErrIncorrectCode) {
				http.Error(w, "Неправильный пароль", http.StatusBadRequest)
				return
			} else {
				http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
				return
			}
		}
		w.Write([]byte("Пользователь зарегистрирован"))
	}
}

func Sign_in_handler(db *pgxpool.Pool, rdb *redis.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
		defer cancel()

		var request models.Confirm_email_request
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Неправильный формат данных", http.StatusBadRequest)
			return
		}

		err, cookie := Sign_in(ctx, db, rdb, request)
		if err != nil {
			if err == ErrIncorrectPassword || err == ErrNonExistingUser {
				http.Error(w, "Неправильный пароль", http.StatusBadRequest)
				return
			} else {
				http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
				return
			}
		}
		http.SetCookie(w, cookie)
		w.Write([]byte("Пользователь авторизован"))
	}
}

func Sign_out_handler(rdb *redis.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
		defer cancel()

		var request models.Sign_out_request
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Неправильный формат данных", http.StatusBadRequest)
			return
		}

		cookie, err := Sign_out(ctx, rdb, request.Mail)
		if err != nil {
			if err != ErrIncorrectCookie {
				http.Error(w, "Не существующий пользователь", http.StatusBadRequest)
				return
			} else {
				http.Error(w, "Ошибка сервера", http.StatusInternalServerError)
				fmt.Println(err)
				return
			}
		}
		http.SetCookie(w, cookie)
		w.Write([]byte("Успешно выполнен выход"))
	}
}
