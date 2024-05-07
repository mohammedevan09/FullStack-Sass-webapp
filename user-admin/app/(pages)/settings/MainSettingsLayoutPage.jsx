'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

const MainSettingsLayoutPage = ({ allSettings }) => {
  const pathname = usePathname()

  const { userInfo } = useSelector((state) => state?.user)

  return (
    <>
      <div className="flex justify-start items-center sm:gap-12 gap-3 text-black sm:text-xl xs:text-lg text-base sm:mx-4 xs:mx-3 mx-1 border-t-2 border-b-2 border-[#007eff0f]">
        {allSettings?.map((item, i) => (
          <div
            key={i}
            className={`${
              item?.link === pathname ? 'font-semibold' : 'font-medium'
            } overflow-x-hidden`}
          >
            <div className="m-3">
              <Link href={`${item?.link}?userId=${userInfo?._id}`}>
                {item?.title}
              </Link>
            </div>
            {item?.link === pathname && (
              <div
                className="w-full bg-[#377eff] h-1 rounded-lg"
                style={{
                  boxShadow: '0 0 33px 3px #8ca4ff',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default MainSettingsLayoutPage
