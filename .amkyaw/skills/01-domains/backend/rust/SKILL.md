# Rust Skill

**Category:** Domain - Backend  
**Priority:** 70

## Overview

Expert knowledge for Rust application development.

## Key Topics

- Ownership and borrowing
- Traits and generics
- Error handling
- Async with Tokio
- Web frameworks (Actix, Axum)
- Testing

## Usage

```rust
use actix_web::{web, App, HttpResponse};

#[derive(serde::Deserialize)]
struct Query {
    name: String,
}

async fn greet(query: web::Query<Query>) -> HttpResponse {
    HttpResponse::Ok().body(format!("Hello, {}!", query.name))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    actix_web::HttpServer::new(|| {
        App::new().route("/greet", web::get().to(greet))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```

## Best Practices

1. Embrace the ownership system
2. Use Result for error handling
3. Write tests alongside code
4. Use async/await for I/O
5. Leverage the ecosystem (crates.io)
