# Go Skill

**Category:** Domain - Backend  
**Priority:** 75

## Overview

Expert knowledge for Go application development.

## Key Topics

- Goroutines and channels
- Interfaces
- Error handling
- Testing with Go
- Web frameworks (Gin, Echo)
- Concurrency patterns

## Usage

```go
package main

import (
    "encoding/json"
    "net/http"
)

type Item struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

func getItems(w http.ResponseWriter, r *http.Request) {
    items := []Item{{ID: 1, Name: "Item 1"}}
    json.NewEncoder(w).Encode(items)
}

func main() {
    http.HandleFunc("/api/items", getItems)
    http.ListenAndServe(":8080", nil)
}
```

## Best Practices

1. Use interfaces for abstraction
2. Handle errors explicitly
3. Use context for cancellation
4. Write table-driven tests
5. Follow Go idioms and conventions
