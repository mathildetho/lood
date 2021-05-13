import * as yup from 'yup';

const initialValue = {
  email: '',
  password: '',
};

const connexionValidationSchema = yup.object().shape({
  email: yup.string().required('Votre email est requis'),
  password: yup.string().required('Votre mot de passe est requis'),
});

export { connexionValidationSchema, initialValue };
