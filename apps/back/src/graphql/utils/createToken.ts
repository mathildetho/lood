import jwt, { Secret } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { SECRET_KEY } from '../../config';

const jwtsecret = SECRET_KEY as Secret;
const expiration = 365 * 24 * 60 * 60 * 1000;

type ID = Types.ObjectId;

const createToken = ({
  payload,
  maxAge = expiration,
}: {
  payload: { email?: string; password?: string; id?: ID };
  maxAge?: number;
}): string => {
  const token = jwt.sign(payload, jwtsecret, {
    expiresIn: maxAge,
  });

  return token;
};

export default createToken;
