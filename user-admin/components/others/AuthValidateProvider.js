'use client'

import {
  getUserByIdApi,
  handleRefreshTokenApi,
  logoutUserApi,
} from '@/api/userApi'
import { setUsers } from '@/store/reducers/userReducer'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export const isAccessTokenExpired = (token) => {
  if (!token) return true
  try {
    const decodedToken = jwtDecode(token)
    return decodedToken.exp * 1000 < Date.now()
  } catch (error) {
    return true
  }
}

const AuthValidateProvider = ({ refreshToken, children }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state?.user)

  useLayoutEffect(() => {
    const settingUser = async () => {
      if (isAccessTokenExpired(userInfo?.token)) {
        if (refreshToken) {
          try {
            const { accessToken } = await handleRefreshTokenApi({
              refreshToken: refreshToken?.value,
            })
            if (accessToken) {
              const userData = await getUserByIdApi(accessToken)
              dispatch(setUsers(userData))
            }
          } catch (error) {
            await logoutUserApi()
            dispatch(setUsers({}))
          }
        } else {
          await logoutUserApi()
          dispatch(setUsers({}))
        }
      }
    }
    settingUser()
  }, [refreshToken])

  return <>{children}</>
}

export default AuthValidateProvider
