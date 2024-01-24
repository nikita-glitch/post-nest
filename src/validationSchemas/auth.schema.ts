import { UserInterface } from 'src/interfaces/Interfaces';
import * as yup from 'yup';

export const signUpSchema: yup.ObjectSchema<UserInterface> = yup.object({
  name: yup.string().required('Name shouldn`t be empty').trim(),
  email: yup.string().required('Email shouldn`t be empty').email().trim(),
  password: yup
    .string()
    .required('Password shouldn`t be empty')
    .min(5, 'password must be at least 5 characters long')
    .max(12, 'password must be less than 12 characters long'),
});

export const signInSchema: yup.ObjectSchema<Omit<UserInterface, 'name'>> = yup.object({
  email: yup.string().required('Email shouldn`t be empty').email().trim(),
  password: yup
    .string()
    .required('Password shouldn`t be empty')
    .min(5, 'password must be at least 5 characters long')
    .max(12, 'password must be less than 12 characters long'),
});


