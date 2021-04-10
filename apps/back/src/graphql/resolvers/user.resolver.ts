import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import UserSchema, { IUser } from '../../db/models/User';
import NotFoundError from '../../errors/NotFoundError';
import InputError from '../../errors/InputError';
import createToken from '../utils/createToken';
import BadRequestError from '../../errors/BadRequestError';
import CreationError from '../../errors/CreationError';
import UnauthorizedError from '../../errors/UnhauthorizedError';
import { validateData } from '../utils/validateData';
import FoodSchema, { IFood } from '../../db/models/Food';
import User from '../../db/models/User';
import { Icontext } from '../typeDef';

type ID = Types.ObjectId;

interface ILoginUser {
  email: string;
  password: string;
}

interface UserWithToken {
  token: string;
  user: IUser;
}

interface UserInput {
  userInput: IUser;
  _id: ID;
}

export default {
  Query: {
    async getUser(_: void, data: IUser): Promise<IUser> {
      const userId = data._id;

      const errors: string[] = [];
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push('Missing ID input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const user = await UserSchema.findById(userId);
      if (!user) {
        throw new NotFoundError();
      }

      return user;
    },

    async loginUser(_: void, data: ILoginUser): Promise<UserWithToken> {
      const errors: string[] = [];
      if (errors.length) {
        throw new InputError(errors);
      }

      const { email, password } = data;
      const findUserByEmail = await UserSchema.findOne({ email });

      if (!findUserByEmail) {
        throw new NotFoundError();
      }

      const auth = await bcrypt.compare(password, findUserByEmail?.password);

      if (!auth) {
        throw new Error();
      }

      const token = createToken({ id: findUserByEmail._id });

      return { token, user: findUserByEmail };
    },
  },

  Mutation: {
    async createUser(_: void, data: UserInput): Promise<UserWithToken> {
      const { email } = data.userInput;

      const errors = validateData(data.userInput);

      const userWithSameEmail = await UserSchema.findOne({ email });

      if (userWithSameEmail) {
        throw new BadRequestError([
          `A user already exists with the email ${email}`,
        ]);
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const hashPassword = bcrypt.hashSync(data.userInput.password, 10);
      const userData = { ...data.userInput, password: hashPassword };
      const user = new UserSchema(userData);
      if (user) {
        await user.save();
        const token = createToken({ id: user._id });

        return { token, user };
      } else {
        throw new CreationError();
      }
    },

    async updateUserProfil(_: void, data: UserInput): Promise<IUser> {
      const userId = data._id;

      if (!userId) throw new UnauthorizedError();

      const errors = validateData(data.userInput);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push('User id is missing.');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const updatedUserProfil = new UserSchema({ ...data.userInput });

      if (updatedUserProfil) {
        await UserSchema.findByIdAndUpdate(
          userId,
          {
            ...data.userInput,
          },
          { new: true }
        );

        return updatedUserProfil;
      } else {
        throw new CreationError(['Issue with user profil update.']);
      }
    },

    async updateUserEmail(_: void, data: IUser): Promise<IUser> {
      const userId = data._id;
      const { email } = data;

      if (!userId) throw new UnauthorizedError();

      const errors = validateData(data);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push('User id is missing.');
      }

      const userBefore = await UserSchema.findById(userId);

      // email already taken
      const userWithSameEmail = await UserSchema.findOne({ email });
      if (userWithSameEmail && userWithSameEmail.email !== userBefore.email) {
        throw new BadRequestError([
          `A user already exists with the email ${email}`,
        ]);
      }
      if (errors.length) {
        throw new InputError(errors);
      }

      const updatedUserMail = new UserSchema({ ...data });

      if (updatedUserMail) {
        await UserSchema.findByIdAndUpdate(
          userId,
          {
            ...data,
          },
          { new: true }
        );

        return updatedUserMail;
      } else {
        throw new CreationError(['Issue with user email update.']);
      }
    },

    async updateUserPassword(_: void, data: IUser): Promise<IUser> {
      const userId = data._id;

      if (!userId) throw new UnauthorizedError();

      const errors = validateData(data);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push('User id is missing.');
      }

      const userBefore: IUser = await UserSchema.findById(userId);

      // change password
      const noChangePassword = bcrypt.compareSync(
        data.password,
        userBefore.password
      );
      let userData = {};
      if (noChangePassword) {
        userData = { ...userBefore._doc };
      } else {
        const hashPassword = bcrypt.hashSync(data.password, 10);
        userData = { ...userBefore._doc, password: hashPassword };
      }

      const updatedUserPassword = new UserSchema(userData);

      if (updatedUserPassword) {
        await UserSchema.findByIdAndUpdate(
          userId,
          {
            ...userData,
          },
          { new: true }
        );

        return updatedUserPassword;
      } else {
        throw new CreationError(['Issue with user password update.']);
      }
    },

    async deleteUser(_: void, { _id }): Promise<IUser> {
      const errors = [];
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        errors.push('missing Id input');
      }
      if (errors.length) {
        throw new InputError(errors);
      }

      const deletedUser = await UserSchema.findByIdAndDelete({ _id });

      if (!deletedUser) {
        throw new CreationError(['issue with deleted user']);
      }
      return deletedUser;
    },

    async likeFood(_: void, { foodId }, context: Icontext): Promise<IUser> {
      if (!context.user.id) throw new UnauthorizedError();

      const food = await FoodSchema.findById(foodId);

      if (!food) {
        throw new CreationError(['issue with like food']);
      }

      const likedFood = UserSchema.findByIdAndUpdate(
        context.user.id,
        {
          $push: { favorite_food: foodId },
        },
        {
          new: true,
        }
      );
      return likedFood;
    },
  },
};
