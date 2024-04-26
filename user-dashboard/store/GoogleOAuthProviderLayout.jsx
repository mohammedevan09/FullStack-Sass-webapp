'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect, useLayoutEffect } from 'react'
import { setUsers } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import { getUserByIdApi, handleRefreshTokenApi } from '@/api/userApi'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { addVisitorsAffiliateApi } from '@/api/affiliateApi'

export const isAccessTokenExpired = (token) => {
  if (!token) return true
  try {
    const decodedToken = jwtDecode(token)
    return decodedToken.exp * 1000 < Date.now()
  } catch (error) {
    return true
  }
}

const GoogleOAuthProviderLayout = ({ refreshToken, children }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state?.user)
  const { ref } = useSelector((state) => state?.affiliate)

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
            dispatch(setUsers({}))
          }
        } else {
          dispatch(setUsers({}))
        }
      }
    }
    settingUser()
  }, [refreshToken])

  useEffect(() => {
    if (ref && ref !== '') {
      const addVisitor = async () => {
        let machineId = localStorage.getItem('MachineId')

        if (!machineId) {
          machineId = crypto.randomUUID() + ref
          localStorage.setItem('MachineId', machineId)
          await addVisitorsAffiliateApi({ userId: ref, visitorId: machineId })
        }
      }
      addVisitor()
    }
  }, [ref])

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  )
}

export default GoogleOAuthProviderLayout
