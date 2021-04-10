import { mergeTypeDefs } from '@graphql-tools/merge';
import { IUser } from '../../db/models/User';
import FoodType from './food.type';
import UserType from './user.type';

export default mergeTypeDefs([UserType, FoodType]);

export interface Icontext {
  user: Partial<IUser>;
  _extensionStack: unknown;
}
