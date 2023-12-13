'use client'

import { HowToGuideTutorialsYTIcon } from '@/staticData/Icon'

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
  return (
    <div className="grid items-center my-20 w-full">
      <h1 className="text-5xl font-semibold flex gap-2">
        How to guide & Tutorials <HowToGuideTutorialsYTIcon />
      </h1>
      <div className="grid items-center justify-center w-full grid-cols-2 gap-8 2xl:my-20 my-10">
        {ytVideo?.map((item, i) => (
          <div
            key={i}
            className="bg-white py-4 px-4 rounded-[15px] 2xl:w-full w-[400px]"
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
