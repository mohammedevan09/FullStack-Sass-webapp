'use client'

import { HowToGuideTutorialsYTIcon } from '@/staticData/Icon'
import { useEffect, useState } from 'react'

const MainHowToGuideIcon = () => {
  const ytVideo = [
    {
      title: 'DSA Roadmap 2023',
      link: 'https://www.youtube.com/embed/hWv14RdI_hk?si=0cJZgle8AaAWHSnQ',
    },
    {
      title: 'DSA Roadmap 2023',
      link: 'https://www.youtube.com/embed/hCrO_cR7kno?si=8RZaOKUPnEWtFpNN',
    },
    {
      title: 'DSA Roadmap 2023',
      link: 'https://www.youtube.com/embed/ZOkE0qi-tCU?si=K5xr9_AG2XzuLZB6',
    },
    {
      title: 'DSA Roadmap 2023',
      link: 'https://www.youtube.com/embed/_Tus38nVRMc?si=K_F5eliTRxMOWxmN',
    },
  ]

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
    <div className="grid items-center my-20 w-full justify-center sm:px-4 xs:px-3 px-1">
      <h1 className="md:text-5xl sm:text-4xl text-3xl  font-semibold flex gap-2">
        How to guide & Tutorials{' '}
        <HowToGuideTutorialsYTIcon size={isSmallScreen && '37'} />
      </h1>
      <div className="grid items-center justify-center w-full sm:grid-cols-2 gap-8 2xl:my-20 my-10">
        {ytVideo?.map((item, i) => (
          <div
            key={i}
            className="bg-white py-4 sm:px-4 pr-4 rounded-[15px] 2xl:w-full w-[400px]"
          >
            <h3 className="text-xl font-bold mb-3 text-center">
              {item?.title}
            </h3>
            <iframe
              className="2xl:w-[499px] w-full 2xl:h-[279px] h-[200px]"
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

export default MainHowToGuideIcon
