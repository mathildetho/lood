import * as yup from 'yup';

const initialValue = {
  email: '',
};

const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().required('Votre email est requis'),
});

export { forgotPasswordValidationSchema, initialValue };
