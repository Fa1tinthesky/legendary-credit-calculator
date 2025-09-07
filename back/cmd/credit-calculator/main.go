package main

import (
	"log"
	"time"

	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/databases/db"
	allertsystem "github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/allert_system"
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

	go func() {
		ticker := time.NewTicker(15 * time.Second)
		defer ticker.Stop()

		for {
			<-ticker.C
			allertsystem.Send_allert_messages(db.DB)
		}
	}()

	server.Run()

}
