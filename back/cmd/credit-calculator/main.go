package main

import (
	"log"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/databases/db"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/server"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err, "Error loading .env file")
	}
	db.Init()
	port := pkg.GetEnvWithDefault("fcrg", "8080")
	server := server.NewServer(port)

	server.Run()
}
