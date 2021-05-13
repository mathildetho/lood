import mongoose, { Types } from 'mongoose';
import FoodSchema, { IFood } from '../../db/models/Food';
import BadRequestError from '../../errors/BadRequestError';
import CreationError from '../../errors/CreationError';
import InputError from '../../errors/InputError';
import NotFoundError from '../../errors/NotFoundError';
import { validateData } from '../utils/validateData';

type ID = Types.ObjectId;

interface FoodInput {
  foodInput: IFood;
  _id?: ID;
}

export default {
  Query: {
    async getFood(_: void, data: IFood): Promise<IFood> {
      const foodId = data._id;

      const errors: string[] = [];
      if (!mongoose.Types.ObjectId.isValid(foodId)) {
        errors.push('Missing ID input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const food = await FoodSchema.findById(foodId);
      if (!food) {
        throw new NotFoundError("La food demandée n'existe pas");
      }

      return food;
    },
    async getAllFood(): Promise<IFood[]> {
      const food = await FoodSchema.find();
      if (!food) {
        throw new NotFoundError("Il n'y a pas de food disponible");
      }

      return food;
    },
  },
  Mutation: {
    async createFood(_: void, data: FoodInput): Promise<IFood> {
      const errors = validateData(data.foodInput);
      const foodWithSameTitle = await FoodSchema.findOne({
        title: data.foodInput.title,
      });

      if (foodWithSameTitle) {
        throw new BadRequestError(
          `A food already exists with the title ${data.foodInput.title}`
        );
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const food = new FoodSchema(data.foodInput);
      if (food) {
        await food.save();

        return food;
      } else {
        throw new CreationError();
      }
    },

    async updateFood(_: void, data: FoodInput): Promise<IFood> {
      const foodId = data._id;

      const errors = validateData(data.foodInput);
      const foodWithSameTitle = await FoodSchema.findOne({
        title: data.foodInput.title,
      });

      if (foodWithSameTitle) {
        throw new BadRequestError(
          `A food already exists with the title ${data.foodInput.title}`
        );
      }

      if (!mongoose.Types.ObjectId.isValid(foodId)) {
        errors.push('User id is missing.');
      }
      if (errors.length) {
        throw new InputError(errors);
      }

      const updatedFood = new FoodSchema(data.foodInput);

      if (updatedFood) {
        await FoodSchema.findByIdAndUpdate(
          foodId,
          {
            ...data.foodInput,
          },
          { new: true }
        );

        return updatedFood;
      } else {
        throw new CreationError(['Issue with food update.']);
      }
    },

    async deleteFood(_: void, { _id }): Promise<IFood> {
      const errors = [];
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        errors.push('missing Id input');
      }
      if (errors.length) {
        throw new InputError(errors);
      }

      const deletedFood = await FoodSchema.findByIdAndDelete({ _id });

      if (!deletedFood) {
        throw new CreationError(['issue with deleted food']);
      }
      return deletedFood;
    },
  },
};
