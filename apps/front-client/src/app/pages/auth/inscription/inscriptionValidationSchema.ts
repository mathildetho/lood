import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

function checkIfFilesAreTooBig(file?: File): boolean {
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 10) {
      valid = false;
    }
    return valid;
  }
  return valid;
}

function checkIfFilesAreCorrectType(file?: File): boolean {
  let valid = true;
  if (file) {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      valid = false;
    }
    return valid;
  }
  return valid;
}

const initialValue = {
  photo: null,
  pseudo: '',
  description: '',
  birthdate: null,
  sexe: null,
  lookFor: null,
  email: '',
  password: '',
};

const inscriptionValidationSchema = yup.object().shape({
  photo: yup
    .mixed()
    .required('Votre photo est requise')
    .test(
      'is-correct-file',
      'Votre photo est trop volumineuse',
      checkIfFilesAreTooBig
    )
    .test(
      'is-big-file',
      "Le format de votre photo n'est pas supporté",
      checkIfFilesAreCorrectType
    ),
  pseudo: yup
    .string()
    .required('Votre pseudo est requis')
    .min(6, 'Votre pseudo doit contenir 6 caractères minimun'),
  description: yup
    .string()
    .required('Votre description est requise')
    .min(30, 'Veuillez écrire au moins 30 caractères'),
  birthdate: yup
    .date()
    .typeError("La date n'est pas valide")
    .required("Votre date d'anniversaire est requise"),
  sexe: yup
    .string()
    .matches(/(Homme|Femme|Autre)/, 'Votre sexe est requis')
    .nullable()
    .required('Votre sexe est requis'),
  lookFor: yup
    .string()
    .matches(/(Homme|Femme|Tous)/, 'Votre type de recherche est requise')
    .nullable()
    .required('Votre type de recherche est requise'),
  email: yup
    .string()
    .email('Entrez un email valide')
    .required('Votre email est requis'),
  password: yup
    .string()
    .min(
      6,
      ({ min }) => `Votre mot de passe doit contenir ${min} caractères minimum`
    )
    .matches(
      /^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Votre mot de passe doit contenir 1 majuscule, 1 minuscule et 1 chiffre'
    )
    .required('Votre mot de passe est requis'),
});

export { inscriptionValidationSchema, initialValue };
