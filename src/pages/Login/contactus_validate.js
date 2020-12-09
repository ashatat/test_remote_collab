import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const fieldSchema = (fieldName) => {
  switch (fieldName) {
    case 'email':
      return yup.string().email().required();
    case 'password':
      return yup.string().required();

    default:
      throw new Error('invalid fieldName');
  }
};
