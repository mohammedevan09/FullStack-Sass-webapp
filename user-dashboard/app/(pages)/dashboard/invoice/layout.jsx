'use client'

import { redirect } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

const layout = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user)

  useLayoutEffect(() => {
    if (userInfo?.access && !userInfo?.access?.invoice?.access) {
      redirect('/dashboard')
    }
  }, [userInfo])

  return <div className="sm:px-4 xs:px-3 px-1 sm:my-14 my-10">{children}</div>
}

export default layout
