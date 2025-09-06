package server

import (
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation"
	"github.com/gorilla/mux"
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
	r := mux.NewRouter()

	r.HandleFunc("/api/calculate", calculation.CalculateHandler).Methods(http.MethodPost)

	log.Println("Starting server on port " + s.Port)
	if err := http.ListenAndServe(":"+s.Port, r); err != nil {
		log.Fatal(err)
	}
}
