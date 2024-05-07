'use client'

import { BackButtonIcon } from '@/staticData/Icon'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const BackButton = ({ title, link }) => {
  const { userInfo } = useSelector((state) => state?.user)
  return (
    <Link
      href={`${link}?userId=${userInfo?._id}`}
      className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1 hover:scale-110 transition"
    >
      <BackButtonIcon /> {title}
    </Link>
  )
}

export default BackButton
