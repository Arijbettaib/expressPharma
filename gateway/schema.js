const { gql } = require('graphql-tag');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Order {
    id: ID!
    userId: ID!
    items: [String!]!
    totalAmount: Float!
    status: String!
  }

  type Query {
    getUser(token: String!): User
    getOrders(token: String!): [Order]
  }

  type Mutation {
    login(email: String!, password: String!): String
    createOrder(token: String!, items: [String!]!, totalAmount: Float!): Order
  }
`;
