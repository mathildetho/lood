import { mergeResolvers } from '@graphql-tools/merge';
import foodResolver from './food.resolver';
import userResolver from './user.resolver';

export default mergeResolvers([userResolver, foodResolver]);
