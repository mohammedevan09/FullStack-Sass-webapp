import { BackButtonIcon } from '@/staticData/Icon'
import Link from 'next/link'
import React from 'react'

const BackButton = ({ title, link }) => {
  return (
    <Link
      href={link}
      className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1 hover:scale-110 transition"
    >
      <BackButtonIcon /> {title}
    </Link>
  )
}

export default BackButton
