import { isFilled, isValidEmail } from '../../../utils/validators'

export const validationSchemaArr = [
  {
    prop: 'email',
    validator: isValidEmail
  },
  {
    prop: 'password',
    validator: isFilled
  }
]

export const defaultFormState = {
  email: '',
  password: ''
}

export const defaultFormErrorsState = {
  email: false,
  password: false
}
