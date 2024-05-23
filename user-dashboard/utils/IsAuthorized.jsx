'use server'

import { handleRefreshTokenApi } from '@/api/userApi'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

const isAccessTokenExpired = (token) => {
  if (!token) return true
  try {
    const decodedToken = jwtDecode(token)
    return decodedToken.exp * 1000 < Date.now()
  } catch (error) {
    return true
  }
}

const IsAuthorized = async (token) => {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')
  if (isAccessTokenExpired(token)) {
    const { accessToken } = await handleRefreshTokenApi({
      refreshToken: refreshToken?.value,
    })
    return accessToken
  } else {
    return token
  }
}

export default IsAuthorized
