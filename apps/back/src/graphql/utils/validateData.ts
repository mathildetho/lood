import validator from 'validator';
import { IFood } from '../../db/models/Food';
import { IUser } from '../../db/models/User';

/**
 * verify input data is not empty
 * @param {string} nameInput - name of the input
 * @param {string} valueInput - value of the input
 * @param {string[]} errors - all errors of empties input
 * @returns null
 */
const validateIsNotEmpty = (
  nameInput: string,
  valueInput: string,
  errors: string[]
) => {
  if (validator.isEmpty(valueInput)) {
    errors.push(`Missing ${nameInput} input`);
  }
};

/**
 * verify data using validator
 * @param {IFood | IUser} data - data from food or user
 * @returns {string[]} errors of validator
 */
export const validateData = (data: IFood | IUser): string[] => {
  const errors: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    validateIsNotEmpty(key, value, errors);
  }

  const dataUser = data as IUser;
  // verification auth data
  if (dataUser.email) {
    if (!validator.isEmail(dataUser.email)) {
      errors.push('Email is not correct');
    }
  }

  if (dataUser.password) {
    if (
      !validator.isStrongPassword(dataUser.password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      errors.push('Password format is not correct');
    }
  }

  return errors;
};
