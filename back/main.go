package main

import (
	"log"
	"net/http"

	"github.com/Fa1tinthesky/legendary-credit-calculator.git/controller"
	
)

func main() {
	http.HandleFunc("/get-excel", controller.GetExcel)
	port := "8080"
	log.Println("Server running on port", port)
	if err := http.ListenAndServe("10.192.8.65:"+port, nil); err != nil {
		log.Fatal(err)
	}
	
}
