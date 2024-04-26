'use client'

import { setRef } from '@/store/reducers/affiliateReducer'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Hero = ({ searchParams }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchParams?.ref) {
      dispatch(setRef(searchParams?.ref))
    }
  }, [searchParams])

  return (
    <div className="grid justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">
        {' '}
        Here Will be Landing page of WP Sprint LLC
        <Link
          href={'/dashboard'}
          className="py-1 px-3 rounded-md btn-hover text-2xl font-bold text-white flex gap-4 justify-center mt-4"
        >
          Go to Dashboard
        </Link>
      </h1>
    </div>
  )
}

export default Hero
