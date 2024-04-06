import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ServiceCard = ({ item, link, i, type }) => {
  return (
    <div
      key={i}
      className="grid items-center justify-center py-5 lg:px-10 px-5 bg-white rounded-[15px] gap-6 w-full relative"
    >
      <div className="absolute top-3 right-3 bg-indigo-600 px-2 py-1 text-xs text-white font-medium rounded-full">
        {type}
      </div>
      <div className="grid justify-center gap-1">
        <Image
          src={item?.icon}
          alt={item?.name}
          width={50}
          height={50}
          className="object-contain mx-auto"
        />
      </div>
      <h3 className="2xl:text-xl text-base font-semibold text-center">
        {item?.name}
      </h3>
      <Link
        href={`/dashboard/services${link}`}
        className="w-[189px] h-[43px] btn-hover rounded-[5px] text-base font-semibold text-center flex items-center justify-center mx-auto"
      >
        Browse packages
      </Link>
    </div>
  )
}

export default ServiceCard
