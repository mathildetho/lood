import { gql } from 'apollo-server';

const UserType = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    lookFor: String!
    pseudo: String!
    birthdate: String!
    photo: String!
    photoType: String!
    status: String!
    sexe: String!
    description: String!
    favorite_food: [ID!]
  }

  type UserWithToken {
    token: String!
    user: User!
  }

  input CreateUserInput {
    email: String
    password: String
    lookFor: String
    pseudo: String
    birthdate: String
    photo: String
    photoType: String
    sexe: String
    description: String
  }

  input UpdateUserProfilInput {
    lookFor: String
    pseudo: String
    birthdate: String
    photo: String
    photoType: String
    sexe: String
    description: String
  }

  type Query {
    getUser(_id: ID!): User!
  }

  type Mutation {
    createUser(userInput: CreateUserInput!): User!
    activateUser(token: String!): UserWithToken!
    loginUser(email: String!, password: String!): UserWithToken
    updateUserProfil(_id: ID!, userInput: UpdateUserProfilInput!): User!
    updateUserEmail(_id: ID!, email: String!): User!
    updateUserPassword(_id: ID!, password: String!): User!
    deleteUser(_id: ID!): User!
    likeFood(foodId: ID!): User!
  }
`;

export default UserType;
