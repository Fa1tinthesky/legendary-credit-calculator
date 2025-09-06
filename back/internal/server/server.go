package server

import (
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation"
	excel_export "github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/excel-export"
	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"
	"log"
	"net/http"
)

type Server struct {
	Port string
}

func NewServer(port string) *Server {
	return &Server{
		Port: port,
	}
}

func (s *Server) Run() {
	r := chi.NewRouter()

	r.Post("/api/calculate", calculation.CalculateHandler)
	r.Get("/api/get-excel", excel_export.GetExcelHandler)

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	})

	handler := corsHandler.Handler(r)

	log.Println("Starting server on port " + s.Port)
	if err := http.ListenAndServe(":"+s.Port, handler); err != nil {
		log.Fatal(err)
	}
}
