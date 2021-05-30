import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($userInput: CreateUserInput!) {
    createUser(userInput: $userInput) {
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
  }
`;

export const ACTIVATE_USER = gql`
  mutation activateUser($token: String!) {
    activateUser(token: $token) {
      token
      user {
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
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
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
    }
  }
`;

export const SEND_EMAIL_REINIT_PASSWORD = gql`
  mutation sendEmailReinitPassword($email: String!) {
    sendEmailReinitPassword(email: $email) {
      message
    }
  }
`;

export const REINIT_PASSWORD = gql`
  mutation reinitPassword($password: String!, $token: String!) {
    reinitPassword(password: $password, token: $token) {
      message
    }
  }
`;
