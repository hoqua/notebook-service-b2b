import { useLocalStorage } from '../hooks/useLocalStorage'
import { useFetch } from 'use-http'

export const useAuthOptions = () => {
  const [token] = useLocalStorage('token')

  return {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      request: async ({ options, url, path, route }) => {
        // if (isExpired(token)) {
        //   token = await getNewToken()
        //   setToken(token)
        // }
        options.headers.Authorization = `Bearer ${token}`
        return options
      },
      // every time we make an http request, before getting the response back, this will run
      response: async ({ response }) => {
        const res = response
        // if (res.data) res.data = toCamel(res.data)
        return res
      }
    }
  }
}

export const useSignUp = () => {
  const { post, error, loading } = useFetch('/do-register.php ')

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

  return { signUp: signUpWithBody, error, loading }
}
