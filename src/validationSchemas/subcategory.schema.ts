import { SubcategoryInterface } from 'src/interfaces/Interfaces'
import * as yup from 'yup'

export const createSubcategorySchema: yup.ObjectSchema<SubcategoryInterface> = yup.object({
  name: yup.string().required('Subcategory name shouldn`t be empty'),
  topcategoryName: yup.string().required('Topcategory name is required')
})

export const updateSubcategorySchema: yup.ObjectSchema<SubcategoryInterface> = yup.object({
  name: yup.string().required('Subcategory name shouldn`t be empty'),
})