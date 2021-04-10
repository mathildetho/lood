import { gql } from 'apollo-server';

const FoodType = gql`
  type Food {
    _id: ID!
    title: String!
    description: String!
    photo: String!
    origine: String!
  }

  type Query {
    getFood(_id: ID!): Food!
    getAllFood: [Food!]!
  }

  input FoodInput {
    title: String!
    description: String!
    photo: String!
    origine: String!
  }

  type Mutation {
    createFood(foodInput: FoodInput!): Food
    updateFood(_id: ID!, foodInput: FoodInput!): Food
    deleteFood(_id: ID!): Food
  }
`;

export default FoodType;
