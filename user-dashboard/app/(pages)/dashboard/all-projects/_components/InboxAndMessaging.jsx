'use client'

import MainEditor from '@/components/text-editor/MainEditor'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import dummyProfile from '@/public/images/dummyProfile.png'
import { MessageSentIcon } from '@/staticData/Icon'
import JsonToText from '@/utils/JsonToText'
import { useSelector } from 'react-redux'
import { formatChatDateAndTime } from '@/utils/formateDateAndTime'
import '@/components/text-editor/tiptapstyle.css'
import io from 'socket.io-client'
import { sendMessageOrderChat } from '@/api/orderChatApi'

export const initialText = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
}

export const socket = io(process.env.NEXT_PUBLIC_HOST, {
  transports: ['websocket'],
})

const InboxAndMessaging = ({ order, orderChat }) => {
  const [chat, setChat] = useState(orderChat)
  const [text, setText] = useState(initialText)
  const [receiverData, setReceiverData] = useState({})

  const messagesEndRef = useRef(null)

  const { userInfo } = useSelector((state) => state?.user)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.lastElementChild?.scrollIntoView()
    }
  }

  const handleMessageSend = async () => {
    socket.emit('sendMessage', {
      sender: userInfo?._id,
      receiver: receiverData?._id,
      orderId: order?._id,
      content: text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    setChat({
      ...chat,
      messages: [
        ...chat?.messages,
        {
          sender: userInfo?._id,
          content: text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })
    await sendMessageOrderChat(chat?._id, {
      orderId: order?._id,
      sender: userInfo?._id,
      content: text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    setText(initialText)
  }

  useEffect(() => {
    if (userInfo) {
      socket.emit('add-user', { orderId: order?._id, userId: userInfo?._id })
      // socket.emit('add-order', order?._id)
    }
  }, [socket, userInfo, order])

  useEffect(() => {
    socket.on('message', (message) => {
      setChat({
        ...chat,
        messages: [...chat?.messages, message],
      })
    })
    scrollToBottom()
  }, [socket, text, chat])

  useEffect(() => {
    let receiverInfo

    if (chat?.participantsInfo) {
      receiverInfo = chat.participantsInfo.find(
        (participant) => participant._id !== userInfo?._id
      )
    }
    setReceiverData(receiverInfo)

    return () => {
      setReceiverData(null)
    }
  }, [userInfo])

  return (
    <div className="grid items-start pb-5  bg-white rounded-[10px] w-full overflow-hidden board-shadow">
      <div className="md:flex grid justify-between items-start w-full md:gap-0 gap-5 bg-[#0000ff1f] sm:px-6 px-4 py-3">
        <div className="md:grid hidden md:justify-start justify-center">
          <h1 className="lg:text-2xl sm:text-xl text-base font-semibold">
            {order?.title}
          </h1>
          <h6 className="text-sm font-medium py-1">{order?.description}</h6>
        </div>
        <div className="flex items-center gap-3">
          <div className="lg:w-[65px] sm:w-[50px] w-[40px]">
            <Image
              src={receiverData?.profileImage || dummyProfile}
              alt="img"
              width={500}
              height={500}
              className="lg:h-[65px] sm:h-[50px] h-[40px] rounded-full bg-[#7136ff36] object-cover"
            />
          </div>
          <div className="grid lg:gap-1">
            <h1 className="lg:text-[22px] sm:text-xl text-base font-semibold">
              {receiverData?.fullName}
            </h1>
            <h4 className="sm:text-base text-sm">
              {' '}
              {receiverData?.position || 'Project Manager'}
            </h4>
          </div>
        </div>
      </div>

      <div
        className="grid gap-6 w-full text-sm md:max-h-[500px] max-h-[390px] overflow-y-scroll pt-6 sm:px-6 px-4 scroll-smooth"
        ref={messagesEndRef}
      >
        {chat?.messages && chat?.messages.length > 0 ? (
          <>
            {chat?.messages?.map((item, i) => {
              const senderInfo = chat.participantsInfo.find(
                (participant) => participant._id === item?.sender
              )
              return (
                <div
                  className={`flex gap-4 w-full ${
                    senderInfo?._id === userInfo?._id && 'flex-row-reverse'
                  }`}
                  key={i}
                >
                  <div className="w-[40px] py-1">
                    <Image
                      src={senderInfo?.profileImage || dummyProfile}
                      alt="img"
                      width={50}
                      height={50}
                      className="h-[40px] object-cover rounded-full bg-[#7136ff36]"
                    />
                  </div>
                  <div className="grid gap-[1px] justify-end">
                    <div
                      className={`flex ${
                        senderInfo?._id === userInfo?._id && 'flex-row-reverse'
                      }`}
                    >
                      <div
                        className={`h-full w-1 ${
                          senderInfo?._id === userInfo?._id
                            ? 'bg-blue-400'
                            : 'bg-indigo-400'
                        } rounded-full`}
                      ></div>
                      <div
                        className={`w-full grid px-3 pt-[2px] pb-[3px] bg-[#001fff1f] ${
                          senderInfo?._id === userInfo?._id
                            ? 'rounded-l-md'
                            : 'rounded-r-md'
                        }`}
                      >
                        {senderInfo && (
                          <>
                            <h1 className="font-semibold">
                              {senderInfo.fullName}
                            </h1>
                            {typeof item?.content === 'object' ? (
                              <h2 className="text-sm tiptap">
                                {JsonToText(item?.content, false)}
                              </h2>
                            ) : (
                              <h2 className="text-sm">{item?.content}</h2>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className={`text-[10px] text-gray-400 font-medium ${
                        senderInfo?._id === userInfo?._id && 'text-right'
                      }`}
                    >
                      {formatChatDateAndTime(item?.createdAt)}
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <h1 className="font-bold text-gray-300 text-xl text-center italic">
            No chat history
          </h1>
        )}
      </div>
      <div className="relative sm:px-6 px-4">
        <MainEditor
          setText={setText}
          className={
            'grid text-sm border border-gray-300 rounded-lg mt-8 relative [&>*:nth-child(2)]:min-h-[45px]'
          }
          subClassName={'order-4'}
          defaultText={text}
          text={text}
        />
        {JsonToText(text) !== JsonToText(initialText) && (
          <div
            className="absolute top-11 right-8 cursor-pointer bg-blue-200 rounded-full px-2 pl-3 py-1"
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
