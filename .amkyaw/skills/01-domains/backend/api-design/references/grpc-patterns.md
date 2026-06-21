# gRPC Patterns

## Protocol Buffers

```protobuf
syntax = "proto3";

package user;

service UserService {
  rpc GetUser (UserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (ListUsersResponse);
  rpc CreateUser (CreateUserRequest) returns (User);
}

message UserRequest {
  string id = 1;
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}
```

## Unary RPC

```go
func (s *Server) GetUser(ctx context.Context, req *pb.UserRequest) (*pb.User, error) {
    return &pb.User{
        Id:    req.Id,
        Name:  "John",
        Email: "john@example.com",
    }, nil
}
```

## Server Streaming

```protobuf
rpc ListUsers (ListUsersRequest) returns (stream User);
```

```go
func (s *Server) ListUsers(req *pb.ListUsersRequest, stream pb.UserService_ListUsersServer) error {
    for _, user := range users {
        stream.Send(user)
    }
    return nil
}
```

## Client Streaming

```protobuf
rpc CreateUsers (stream CreateUserRequest) returns (CreateUsersResponse);
```

## Bidirectional Streaming

```protobuf
rpc Chat (stream ChatMessage) returns (stream ChatMessage);
```

## Best Practices

1. Use meaningful package names
2. Define clear error handling
3. Use proto3 syntax
4. Implement keepalive
5. Use proper deadline/expiration
