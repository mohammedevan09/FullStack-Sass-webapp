'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MainSettingsLayoutPage = ({ allSettings }) => {
  const pathname = usePathname()
  return (
    <>
      <div className="flex justify-start items-center w-full my-3 sm:gap-16 gap-6 text-black sm:text-xl text-lg sm:px-4 xs:px-3 px-1">
        {allSettings?.map((item, i) => (
          <div
            key={i}
            className={`${item?.link === pathname && 'font-semibold'}`}
          >
            <Link href={item?.link}>{item?.title}</Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default MainSettingsLayoutPage
