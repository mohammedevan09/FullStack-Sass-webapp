'use client'

import { HowToGuideTutorialsYTIcon } from '@/staticData/Icon'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const MainHowToGuide = ({ guides }) => {
  const { userInfo } = useSelector((state) => state?.user)

  return (
    <div className="pt-8 sm:my-10 my-8">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-semibold">How to guide & Tutorials</h1>
        {!userInfo?.creatorId && (
          <Link
            href={`/how-to-guide/new`}
            className="w-[130px] h-[34px] btn-hover rounded-[5px] text-center flex items-center justify-center"
          >
            Create New +
          </Link>
        )}
      </div>
      <div className="bg-zinc-400 w-full h-[1px] mt-3 mb-6" />
      <div className="grid items-center gap-4">
        {guides?.map((item) => (
          <div key={item?._id} className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="max-w-5">
                <HowToGuideTutorialsYTIcon size={'27'} />
              </div>
              <p className="font-semibold md:text-base text-sm text-gray-600">
                {item?.title}
              </p>
            </div>

            <Link
              href={`/how-to-guide/${item?._id}`}
              className="hover:scale-105 transition-all duration-200 ease-in-out text-blue-500 hover:text-blue-700 font-medium rounded-[5px] text-center min-w-[100px]"
            >
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainHowToGuide
