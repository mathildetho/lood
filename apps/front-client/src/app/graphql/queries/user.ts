import { gql } from '@apollo/client';

export const GET_USER = gql`
  query user {
    _id
    email
    password
    lookFor
    pseudo
    birthdate
    photo
    photoType
    status
    sexe
    description
  }
`;
