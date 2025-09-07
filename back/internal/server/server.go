package server

import (
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/auth"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/calculation"
	"github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/dashboard"
	excel_export "github.com/Fa1tinthesky/legendary-credit-calculator/backend/internal/excel-export"
	"github.com/labstack/echo/v4"
	mw "github.com/labstack/echo/v4/middleware"
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
	r := echo.New()
	r.Use(mw.Logger())
	r.Use(mw.CORSWithConfig(mw.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.DELETE, echo.PATCH, echo.OPTIONS},
		AllowHeaders: []string{"Content-Type", "session_id"},
	}))

	r.POST("/auth/sign-up", auth.Sign_up_handler)
	r.POST("/auth/confirm-email", auth.Confirm_email_handler)
	r.POST("/auth/sign-in", auth.Sign_in_handler)
	r.POST("/auth/sign-out", auth.Sign_out_handler)
	r.POST("/api/calculate", calculation.CalculateHandler)
	r.GET("/api/get-excel", excel_export.GetExcelHandler)
	r.POST("/api/create-calc", dashboard.Create_calc_handler)
	r.POST("/api/get-calc", dashboard.Get_calc_handler)

	r.Logger.Fatal(r.Start("0.0.0.0:8080"))
}
