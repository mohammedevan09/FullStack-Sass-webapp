'use client'

import { BackButtonIcon, FilterByIdIcon } from '@/staticData/Icon'
import { dropData2, fakeMessageData } from '@/staticData/MainData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import MainEditor from '@/components/text-editor/MainEditor'
import StatusColor from '@/utils/StatusColor'
import TakeAction from '../../../_components/TakeAction'
import OrderBasicInfo from '../../../_components/OrderBasicInfo'
import AdditionInfo from '../../../_components/AdditionInfo'
import ProjectTrackingBoard from '../../../_components/ProjectTrackingBoard'

const MainNormalServiceById = ({ order }) => {
  const [text, setText] = useState('')

  const router = useRouter()

  const handleMessageSend = () => {
    console.log(text)
  }

  console.log(order)

  return (
    <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => router.back()}
        className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1"
      >
        <BackButtonIcon /> Go Back
      </motion.button>
      <div className="sm:flex grid sm:justify-between xs:items-start items-end gap-4 mb-6">
        <OrderBasicInfo order={order} />
        <TakeAction />
      </div>
      <AdditionInfo order={order} />

      <h1 className="text-2xl font-semibold pb-5 pt-10">
        Project Traction Board
      </h1>
      <ProjectTrackingBoard order={order} />
      <h1 className="text-2xl font-semibold pt-10 pb-5">Inbox & Messaging</h1>
      <div className="grid items-start pt-8 pb-5 md:px-10 px-3 bg-white rounded-[20px] w-full">
        <div className="md:flex grid justify-between items-start w-full md:gap-0 gap-5">
          <div className="grid md:justify-start justify-center">
            <h1 className="lg:text-2xl sm:text-xl text-base font-semibold">
              New Website design & development in Wordpress
            </h1>
            <h6 className="sm:text-base text-sm font-normal lg:py-4 py-2">
              Order ID #{order?._id}
            </h6>
          </div>
          <div className="flex items-center gap-3">
            <div className="lg:w-[65px] sm:w-[50px] w-[40px]">
              <Image
                src={'/images/demo.jpg'}
                alt="img"
                width={500}
                height={500}
                className="lg:h-[65px] sm:h-[50px] h-[40px] rounded-full object-cover"
              />
            </div>
            <div className="grid lg:gap-1">
              <h1 className="lg:text-[22px] sm:text-xl text-base font-semibold">
                Jack Johnson
              </h1>
              <h4 className="sm:text-base text-sm">Project manager</h4>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-zinc-300 mb-6 md:mt-0 mt-6" />
        <div className="grid gap-4 w-full">
          {fakeMessageData?.map((item, i) => (
            <div className="flex gap-2 w-full" key={i}>
              <div className="w-[50px]">
                <Image
                  src={item?.image}
                  width={200}
                  height={200}
                  alt="person"
                  className="h-[50px] object-cover rounded-full"
                />
              </div>
              <div className="w-full grid">
                <h1 className="font-semibold">{item?.name}</h1>
                <h2>{item?.message}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <MainEditor
            text={text}
            setText={setText}
            handleMessageSend={handleMessageSend}
          />
          <div className="absolute top-12 right-3">s</div>
        </div>
      </div>
    </div>
  )
}

export default MainNormalServiceById
