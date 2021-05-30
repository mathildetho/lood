import * as yup from 'yup';

const initialValue = {
  email: '',
  password: '',
};

const connexionValidationSchema = yup.object().shape({
  email: yup.string().required('Ton email est requis'),
  password: yup.string().required('Ton mot de passe est requis'),
});

export { connexionValidationSchema, initialValue };
