APP_NAME = bytesniff
BUILD_DIR = ../dist/core
SRC = ./..

UNAME_S := $(shell uname -s)

.PHONY: all build run clean

all: build

build:
	@echo "Building $(APP_NAME)"
	GOOS=$(shell go env GOOS) GOARCH=$(shell go env GOARCH) go build -o $(APP_NAME) main.go
	@echo "Build complete. ./$(APP_NAME)"

run:
	go run main.go

clean:
	@echo "Cleaning up build files."
	rm -f $(APP_NAME)
	@echo "Cleaning complete."

tidy:
	go mod tidy