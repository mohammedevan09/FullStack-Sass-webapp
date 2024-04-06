'use client'

import MainEditor from '@/components/text-editor/MainEditor'
import Image from 'next/image'
import { useState } from 'react'
import { fakeMessageData } from '@/staticData/MainData'
import { MessageSentIcon } from '@/staticData/Icon'
import JsonToText from '@/utils/JsonToText'

export const initialText = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
}

const InboxAndMessaging = ({ order }) => {
  const [text, setText] = useState(initialText)

  const handleMessageSend = () => {
    console.log(text)
    setText(initialText)
  }

  return (
    <div className="grid items-start pt-8 pb-5 md:px-10 px-3 bg-white rounded-[10px] w-full">
      <div className="md:flex grid justify-between items-start w-full md:gap-0 gap-5">
        <div className="grid md:justify-start justify-center">
          <h1 className="lg:text-2xl sm:text-xl text-base font-semibold">
            New Website design & development in Wordpress
          </h1>
          <h6 className="text-sm font-medium lg:py-4 py-1">
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
      <div className="h-[1px] w-full bg-gray-300 mb-6 md:mt-0 mt-6" />
      <div className="grid gap-6 w-full text-sm">
        {fakeMessageData?.map((item, i) => (
          <div className="flex gap-4 w-full" key={i}>
            <div className="w-[40px] py-1">
              <Image
                src={item?.image}
                width={50}
                height={50}
                alt="person"
                className="h-[40px] object-cover rounded-full"
              />
            </div>
            <div className="flex">
              <div className="h-full w-1 bg-blue-600 rounded-full"></div>
              <div className="w-full grid px-3 py-[2px] bg-[#001fff1f] rounded-r-md">
                <h1 className="font-semibold">{item?.name}</h1>
                <h2>{item?.message}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative">
        <MainEditor
          setText={setText}
          className={
            'grid text-sm border border-gray-300 rounded-[4px] mt-8 relative [&>*:nth-child(2)]:min-h-[45px]'
          }
          subClassName={'order-4'}
          defaultText={text}
          text={text}
        />
        {JsonToText(text) !== JsonToText(initialText) && (
          <div
            className="absolute top-11 right-3 cursor-pointer"
            onClick={handleMessageSend}
          >
            <MessageSentIcon />
          </div>
        )}
      </div>
    </div>
  )
}

export default InboxAndMessaging
