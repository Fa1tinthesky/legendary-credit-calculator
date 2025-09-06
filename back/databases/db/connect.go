package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func Connect_to_db(ctx context.Context) (*pgxpool.Pool, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Ошибка загрузки .env:", err)
	}

	connectStr := fmt.Sprintf(
		"postgres://%s:%s@localhost:%s/%s?sslmode=%s",
		os.Getenv("USER"),
		os.Getenv("PASSWORD"),
		os.Getenv("PORT"),
		os.Getenv("DB_NAME"),
		os.Getenv("SSLMODE"),
	)

	pool, err := pgxpool.New(ctx, connectStr)
	if err != nil {
		return nil, fmt.Errorf("не удалось подключиться к БД: %v", err)
	}

	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("ping не прошел: %v", err)
	}

	_, err = pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS temp_users(
			id SERIAL PRIMARY KEY,
			email TEXT NOT NULL,
			email_password TEXT NOT NULL,
			login TEXT NOT NULL,
			temp_code INT NOT NULL,
			finish_time TIMESTAMP
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	_, err = pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS users(
			id SERIAL PRIMARY KEY,
			email TEXT NOT NULL,
			password TEXT NOT NULL,
			login TEXT NOT NULL

		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	_, _ = pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS table_unit(
			id SERIAL PRIMARY KEY,
			email TEXT NOT NULL,
			amount FLOAT NOT NULL,
			data DATE NOT NULL,
		)
	`)

	return pool, nil
}
