'use client'

import { BackButtonIcon, CheckIcon } from '@/staticData/Icon'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fakeMessageData } from '@/staticData/MainData'
import MainEditor from '@/components/text-editor/MainEditor'
import { useState } from 'react'

const MainOpenTicketViewPage = ({ params }) => {
  const [text, setText] = useState('')

  const handleMessageSend = () => {
    console.log(text)
  }
  return (
    <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
      <motion.button whileHover={{ scale: 1.1 }}>
        <Link
          href={'/dashboard/all-tickets'}
          className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1"
        >
          <BackButtonIcon /> Go Back
        </Link>
      </motion.button>
      <div className="sm:flex grid justify-between items-start sm:mb-4 mb-2">
        <div>
          <h1 className="text-xl font-semibold">
            Solve the Font styling issue
          </h1>
          <h2 className="text-lg mt-3">
            <span className="font-semibold">Project: </span>Web design for brick
            LTD (#124A)
          </h2>
          <div className="text-lg font-medium flex gap-4 my-4">
            <h2>Status:</h2>
            <div
              className={`w-[107px] h-7 bg-opacity-20 rounded-[20px] flex justify-center items-center gap-2 bg-rose-600 text-base font-normal`}
            >
              <div className={`w-2.5 h-2.5 rounded-full bg-rose-600`} />
              Pending
            </div>
          </div>
        </div>
        <button className="w-[201px] h-9 bg-blue-600 rounded-[5px] text-lg font-semibold flex justify-center items-center text-white gap-[6px]">
          <CheckIcon color={'white'} />
          Marked As Solved
        </button>
      </div>

      <div className="h-[1px] w-full bg-zinc-600" />

      <h1 className="text-2xl font-semibold pt-10 pb-5">Inbox & Messaging</h1>
      <div className="grid items-start pt-8 pb-5 md:px-10 px-3 bg-white rounded-[20px] w-full">
        <div className="md:flex grid justify-between items-start w-full md:gap-0 gap-5">
          <div className="grid md:justify-start justify-center">
            <h1 className="lg:text-2xl sm:text-xl text-base font-semibold">
              New Website design & development in Wordpress
            </h1>
            <h6 className="sm:text-base text-sm font-normal lg:py-4 py-2">
              Order ID #{params?.id}
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
        <div className="h-[1px] w-full bg-zinc-600 mb-6 md:mt-0 mt-6" />
        <div className="grid gap-4 w-full">
          {fakeMessageData?.map((item, i) => (
            <div className="flex gap-2 w-full" key={i}>
              <div className="w-[50px]">
                <Image
                  src={item?.image}
                  width={200}
                  height={200}
                  alt="person"
                  className="h-[50px] object-cover"
                />
              </div>
              <div className="w-full grid">
                <h1 className="font-semibold">{item?.name}</h1>
                <h2>{item?.message}</h2>
              </div>
            </div>
          ))}
        </div>
        <MainEditor
          text={text}
          setText={setText}
          handleMessageSend={handleMessageSend}
        />
      </div>
    </div>
  )
}

export default MainOpenTicketViewPage
