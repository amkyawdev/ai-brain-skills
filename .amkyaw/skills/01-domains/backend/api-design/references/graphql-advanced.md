# GraphQL Advanced

## Schema Design

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}
```

## Resolvers

```javascript
const resolvers = {
  Query: {
    user: (_, { id }) => getUserById(id),
    users: (_, args) => getUsers(args),
  },
  User: {
    posts: (user) => getPostsByUserId(user.id),
  },
};
```

## N+1 Problem

```javascript
// Use DataLoader
const UserLoader = new DataLoader(ids => batchGetUsers(ids));

const resolvers = {
  User: {
    posts: (user) => UserLoader.load(user.id),
  },
};
```

## Subscriptions

```graphql
type Subscription {
  postCreated: Post!
}
```

```javascript
const resolvers = {
  Subscription: {
    postCreated: {
      subscribe: (_, __, { pubsub }) => 
        pubsub.asyncIterator('POST_CREATED'),
    },
  },
};
```

## Best Practices

1. Use meaningful types and names
2. Implement proper error handling
3. Use DataLoader for N+1 problems
4. Implement pagination with connections
5. Use fragments to reduce repetition
