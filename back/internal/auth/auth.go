package auth

import (
	"context"
	"crypto/rand"
	"errors"
	"fmt"
	"math/big"
	"net/http"
	"time"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	"gopkg.in/gomail.v2"
)

var ErrUserExists = errors.New("такой пользователь уже существует")
var ErrIncorrectCode = errors.New("неправильный код")
var ErrIncorrectCookie = errors.New("несуществующая кука")
var ErrIncorrectPassword = errors.New("неправильный пароль")
var ErrNonExistingUser = errors.New("такого пользователя не существует")

func Sign_up(db *pgxpool.Pool, request models.Sign_up_request) error {
	ctx := context.Background()
	tx, err := db.Begin(ctx)
	if err != nil {
		fmt.Println(1)
		return err
	}

	var email string
	err = tx.QueryRow(ctx, `SELECT email FROM users WHERE email = $1`, request.Mail).Scan(&email)
	if err != nil && !errors.Is(err, pgx.ErrNoRows) {
		fmt.Println(2)
		return err
	}

	if email != "" {
		return ErrUserExists
	}

	n, err := rand.Int(rand.Reader, big.NewInt(900000))
	if err != nil {
		fmt.Println(3)
		return err
	}
	code := n.Int64() + 100000

	now := time.Now()
	_ = now.Add(10 * time.Minute)
	_, err = tx.Exec(ctx, `DELETE FROM temp_users WHERE email = $1`, request.Mail)
	if err != nil {
		fmt.Println(4)
		return err
	}
	_, err = db.Exec(ctx, `INSERT INTO temp_users (email , email_password , login ,temp_code , finish_time) 
		VALUES ($1 , $2 , $3 , $4 , $5)`, request.Mail, request.Password, request.Login, code, now)
	if err != nil {
		fmt.Println(5)
		return err
	}
	tx.Commit(ctx)

	mail_meesage := fmt.Sprintf("Hello %s from LCC\n here is you app verifycation code: %v", request.Login, code)
	m := gomail.NewMessage()
	m.SetHeader("From", "app75490@gmail.com")
	m.SetHeader("To", request.Mail)
	m.SetHeader("Subject", "App verifycation")
	m.SetBody("text/html", fmt.Sprintf(`<h1 class="header" style = "color:blue">%s</h1>`, mail_meesage))

	send := gomail.NewDialer("smtp.gmail.com", 587, "app75490@gmail.com", "znvh weto comb wkkd ")
	err = send.DialAndSend(m)
	if err != nil {
		fmt.Println(6)
		return err
	}
	tx.Commit(ctx)
	return nil
}

func Confirm_email(db *pgxpool.Pool, request models.Confirm_email_request) error {
	ctx := context.Background()
	tx, err := db.Begin(ctx)
	if err != nil {
		return err
	}

	var temp_user models.Temp_user
	err = db.QueryRow(ctx, `SELECT id , email , email_password , login , temp_code FROM temp_users WHERE email = $1`, request.Mail).
		Scan(&temp_user.Id, &temp_user.Email, &temp_user.Email_password, &temp_user.Login, &temp_user.Temp_code)
	if err != nil {
		fmt.Println(1)
		return err
	}

	if temp_user.Temp_code != request.Password {
		return ErrIncorrectCode
	}
	_, err = tx.Exec(ctx, `INSERT INTO users(email , password , login) VALUES($1 , $2 , $3)`,
		temp_user.Email, temp_user.Email_password, temp_user.Login)
	if err != nil {
		fmt.Println(2)
		return err
	}
	tx.Commit(ctx)
	return nil
}

func Sign_in(db *pgxpool.Pool, rdb *redis.Client, request models.Confirm_email_request) (error, *http.Cookie, *string) {
	ctx := context.Background()

	var password string
	err := db.QueryRow(ctx, `SELECT password FROM users WHERE email = $1`, request.Mail).Scan(&password)
	if err == pgx.ErrNoRows {
		return ErrNonExistingUser, nil, nil
	}
	if err != nil {
		return err, nil, nil
	}

	if password != request.Password {
		return ErrIncorrectPassword, nil, nil
	}

	cookie, str := Set_cookies(rdb, request.Mail)

	return nil, cookie, &str
}

func Sign_out(rdb *redis.Client, email string) (*http.Cookie, error) {
	ctx := context.Background()
	_, err := rdb.Get(ctx, email).Result()
	if err == redis.Nil {
		return nil, ErrIncorrectCookie
	} else if err != nil {
		return nil, err
	}

	cookie := Delete_cookies(ctx, rdb, email)
	return cookie, nil
}

func Delete_cookies(ctx context.Context, rdb *redis.Client, email string) *http.Cookie {
	cookie := &http.Cookie{
		Name:     "session_id",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   false,
	}
	return cookie
}

func Set_cookies(rdb *redis.Client, mail string) (*http.Cookie, string) {
	id := uuid.New()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	rdb.Set(ctx, mail, id.String(), 315360000*time.Second)
	rdb.Set(ctx, id.String(), mail, 315360000*time.Second)
	cookie := &http.Cookie{
		Name:     "session_id",
		Value:    id.String(),
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		Expires:  time.Now().Add(315360000 * time.Second),
	}

	return cookie, id.String()
}
