package main

import (
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/server"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/pkg"
	"github.com/joho/godotenv"
	"log"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	port := pkg.GetEnvWithDefault("PORT", "8080")
	server := server.NewServer(port)

	server.Run()
}
