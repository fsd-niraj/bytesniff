package main

// import (
// 	"bytesniff/cert"
// 	"fmt"
// 	"net/http"
// )

// func main() {
// 	certPEM, keyPEM, _ := cert.CreateCertForHost("example.com")
// 	cert.SaveLeaf("amazon.com", certPEM, keyPEM)

// 	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
// 		fmt.Fprintf(w, "HELLo from leaf cert")
// 	})
// 	fmt.Println("Listening on 8843")
// 	err := http.ListenAndServeTLS(":8443", "leaf.pem", "leaf.key", nil)
// 	if err != nil {
// 		panic(err)
// 	}
// }
