import { useFetch } from 'use-http'
import { API_REGISTER } from '../constants/constants'

export const useSignUp = () => {
  const { post, error, loading, response } = useFetch(API_REGISTER)

  const signUpWithBody = ({ firm, name, email, password, phone, telegram }) => {
    const formData = new FormData()
    formData.append('cname', firm)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('fio', name)
    formData.append('phone', phone)
    formData.append('telegram', telegram)
    return post(formData)
  }

  return { signUp: signUpWithBody, error, loading, response }
}
