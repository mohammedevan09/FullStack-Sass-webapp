'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MainSettingsLayoutPage = ({ allSettings }) => {
  const pathname = usePathname()
  return (
    <>
      <div className="flex justify-center items-center w-[500px] ml-20 my-3 gap-16 text-black text-xl">
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
