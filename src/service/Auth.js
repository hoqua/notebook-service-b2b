import { useFetch } from 'use-http'

export const useSignUp = () => {
  const { post, error, loading, response } = useFetch('/do-register.php')

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
