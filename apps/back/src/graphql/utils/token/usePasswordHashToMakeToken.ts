import jwt, { Secret } from 'jsonwebtoken';
import { SECRET_KEY } from '../../../config';
import { Types } from 'mongoose';

type ID = Types.ObjectId;

const jwtsecret = SECRET_KEY as Secret;

const usePasswordHashToMakeToken = (compte: {
  password: string;
  mail: string;
  id: ID;
}) => {
  const payload = {
    password: compte.password,
    mail: compte.mail,
    id: compte.id,
  };

  const token = jwt.sign(payload, jwtsecret, {
    expiresIn: '1h',
  });

  return token;
};

export default usePasswordHashToMakeToken;
