import { TopcategoryInterface } from 'src/interfaces/Interfaces'
import * as yup from 'yup'


export const TopcategorySchema: yup.ObjectSchema<TopcategoryInterface> = yup.object({
  name: yup.string().required('Topcategory name shouldn`t be empty'),
})

