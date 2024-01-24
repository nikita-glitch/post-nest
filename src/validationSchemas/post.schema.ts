import { PostInterface } from 'src/interfaces/Interfaces'
import * as yup from 'yup'

export const createPostSchema: yup.ObjectSchema<PostInterface> = yup.object({
  postText: yup.string().required('Post text shouldn`t be empty'),
  subcategoryId: yup.string().required('Subcategory required')
})

export const updatePostSchema: yup.ObjectSchema<PostInterface> = yup.object({
  postText: yup.string().required('Post text shouldn`t be empty'),
})