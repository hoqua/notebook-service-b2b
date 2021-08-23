const isFilled = (value) => value.length > 0
const isTrue = (value) => value === true
const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validationSchemaArr = [
  {
    prop: 'firm',
    validator: isFilled
  },
  {
    prop: 'name',
    validator: isFilled
  },
  {
    prop: 'email',
    validator: isValidEmail
  },
  {
    prop: 'password',
    validator: isFilled
  },
  {
    prop: 'phone',
    validator: isFilled
  },
  {
    prop: 'telegram',
    validator: isFilled
  },
  {
    prop: 'capcha',
    validator: isTrue
  },
  {
    prop: 'agreed',
    validator: isTrue
  }
]

export const defaultFormState = {
  firm: '',
  name: '',
  email: '',
  password: '',
  phone: '',
  telegram: '',
  capcha: false,
  agreed: false
}

export const defaultFormErrorsState = {
  firm: false,
  name: false,
  email: false,
  password: false,
  phone: false,
  telegram: false,
  capcha: false,
  agreed: false
}
