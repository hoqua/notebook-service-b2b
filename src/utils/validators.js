export const isFilled = (value) => value.length > 0
export const isTrue = (value) => value === true
export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export const isExpired = (date) => (new Date(date)).getTime() < (new Date()).getTime()

export const validate = (formData, schemaArr) => {
  const invalidValidateObj = schemaArr.find(validate => {
    const formValue = formData[validate.prop]
    const isValid = validate.validator(formValue)

    return !isValid
  })
  if (!invalidValidateObj) return null

  return invalidValidateObj.prop
}
