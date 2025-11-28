package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
)

type Message struct {
	Type string `json:"type"`
	Data any
}

type OutMessage struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

func main() {
	fmt.Println("Go backend started...")

	// cert.InitCA()
	// certPEM, keyPEM, _ := cert.GetOrCreateLeaf("amazon.com")
	// fmt.Println("Leaf cert:")
	// fmt.Println(string(certPEM))

	// fmt.Println("Leaf key:")
	// fmt.Println(string(keyPEM))

	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()

		var msg Message
		if err := json.Unmarshal([]byte(line), &msg); err != nil {
			fmt.Println("Invalid message", err)
			continue
		}

		fmt.Printf("MESSAGE %v", msg.Type)

		switch msg.Type {
		case "toggle_inteceptor":
			fmt.Println(" Intercepting", msg.Data)
			sendToApp("intercept_state", msg.Data)
		default:
			fmt.Println("Unknown message", msg.Data)
		}
	}
}

func sendToApp(messageType string, data interface{}) {
	fmt.Print("sent to app")
	msg := OutMessage{Type: messageType, Data: data}
	b, _ := json.Marshal(msg)
	fmt.Println((string(b)))
	os.Stdout.Sync()
}
