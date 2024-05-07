'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function Error() {
  const { userInfo } = useSelector((state) => state?.user)

  return (
    <div className="flex items-center justify-center text-gray-800 h-screen w-screen overflow-hidden bg-white">
      <div className="grid justify-center items-center">
        <h1 className="text-xl font-medium mx-auto">Oops,</h1>
        <div className="flex gap-2">
          <span className="sm:text-[35px] text-[24px] font-bold tracking-wider mx-auto">
            Something went wrong!
          </span>
        </div>
        <div className="w-[320px] mx-auto">
          <Image
            src={'/images/error.jpg'}
            width={500}
            height={500}
            alt="wp sprint"
            className="h-auto"
          />
        </div>
        <Link
          href={`/dashboard?userId=${userInfo?._id}`}
          className="text-center mt-4"
        >
          <button
            type="submit"
            className="py-2 px-10 bg-blue-800 rounded-md text-white font-bold text-base hover:scale-105 transition"
          >
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  )
}
