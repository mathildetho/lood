import jwt, { Secret } from 'jsonwebtoken';
import validator from 'validator';
import { SECRET_KEY } from '../../config';

const jwtsecret = SECRET_KEY as Secret;

interface Itoken {
  exp: number;
  iat: number;
  id?: string;
}

const verifyToken = (token: string): Itoken | null => {
  if (validator.isJWT(token)) {
    return jwt.verify(token, jwtsecret) as Itoken;
  }
  return null;
};

export default verifyToken;
