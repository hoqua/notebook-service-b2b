import { getServerSession } from 'next-auth'
import { API_ROOT, GET_USER } from '../constants/constants'
import { nextAuthOptions } from './auth-options'
import { User } from '../utils-schema/auth.schema'
import { redirect } from 'next/navigation'

export type FetchOptions<D> = {
  url: string
  method?: string
  data?: D
  headers?: Record<string, string>
}

export async function getAuthSessionOrThrow() {
  const session = await getServerSession(nextAuthOptions)
  if (!session?.jwt) {
    redirect('/sign-in')
  }

  return {
    jwt: session.jwt
  }
}

export async function getUserOrThrow() {
  const response = await fetchWrapper<unknown, User>({ url: GET_USER })

  if (!response.success || !response.result) {
    throw new Error('Failed to get user data')
  }

  return response.result
}

export async function fetchWrapper<D, T>(
  args: FetchOptions<D>
): Promise<{ success: boolean; message: string; result: T | null }> {
  const session = await getAuthSessionOrThrow() //Do not call getServerSession on try/catch
  try {
    const { url, method, data, headers } = args
    const newHeaders: HeadersInit = {
      Authorization: `${session.jwt?.auth_token}`,
      ...headers
    }

    if (!(data instanceof FormData)) {
      newHeaders['Content-Type'] = 'application/json'
    }

    const requestBody = data
      ? data instanceof FormData
        ? data
        : JSON.stringify(data)
      : undefined
    const response = await fetch(`${API_ROOT}/${url}`, {
      method,
      body: requestBody,
      headers: newHeaders
    })

    if (!response.ok) {
      throw new Error(`failed_to_fetch`)
    }

    const result = await response.json()

    if (result.error !== 0) {
      return {
        success: false,
        message: result.err_msg,
        result: null
      }
    }

    return {
      success: true,
      message: '',
      result
    }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
