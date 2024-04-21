'use client'

import { HowToGuideTutorialsYTIcon } from '@/staticData/Icon'
import { useEffect, useState } from 'react'

const MainHowToGuide = ({ guide }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div className="grid items-center my-20 w-full sm:px-4 xs:px-3 px-1">
      <h1 className="md:text-5xl sm:text-4xl text-3xl  font-semibold flex gap-2">
        How to guide & Tutorials{' '}
        <HowToGuideTutorialsYTIcon size={isSmallScreen && '37'} />
      </h1>
      <div className="grid items-center w-full sm:grid-cols-2 grid-cols-1 gap-8 2xl:my-20 my-10">
        {guide?.map((item, i) => (
          <div
            key={i}
            className="bg-white py-4 md:px-6 px-4 rounded-[15px] w-full"
          >
            <h3 className="md:text-lg xs:text-base text-sm font-bold mb-3 text-center">
              {item?.title}
            </h3>
            <iframe
              className="w-full 2xl:h-[279px] h-[200px] mx-auto"
              src={item?.link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainHowToGuide
