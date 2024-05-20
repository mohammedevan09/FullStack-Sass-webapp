'use client'

import { redirect } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

const layout = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user)

  useLayoutEffect(() => {
    if (userInfo?.access && !userInfo?.access?.proposals?.access) {
      redirect('/')
    }
  }, [userInfo])

  return <>{children}</>
}

export default layout