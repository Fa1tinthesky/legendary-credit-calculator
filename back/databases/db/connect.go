package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/databases/rdb"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

var (
	DB  *pgxpool.Pool
	RDB *redis.Client
)

func Init() {
	var err error
	DB, err = Connect_to_db()
	if err != nil {
		log.Fatal(err)
	}

	RDB, err = rdb.Connect_to_rdb()
	if err != nil {
		log.Fatal(err)
	}
}

func Connect_to_db() (*pgxpool.Pool, error) {
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

	ctx := context.Background()

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
		log.Fatal(1, err)
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
		log.Fatal(2, err)
	}

	_, err = pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS table_unit(
			id SERIAL PRIMARY KEY,
			email TEXT NOT NULL,
			amount FLOAT NOT NULL,
			data TIMESTAMP NOT NULL,
			interest FLOAT NOT NULL,
			remainder FLOAT NOT NULL
		)
	`)

	if err != nil {
		log.Fatal(3, err)
	}

	_, err = pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS calcs(
			id SERIAL PRIMARY KEY,
			user_id INT NOT NULL,
			amount FLOAT NOT NULL
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	_, err = pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS calcs(
			id SERIAL PRIMARY KEY,
			user_id INT NOT NULL,
			name TEXT NOT NULL,
			amount FLOAT NOT NULL,
			currency INT NOT NULL,
			period INT NOT NULL,
			rate FLOAT NOT NULL,
			type INT NOT NULL,
			start_date DATE NOT NULL
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	return pool, nil
}
