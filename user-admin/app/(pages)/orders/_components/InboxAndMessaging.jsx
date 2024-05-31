'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import MainEditor from '@/components/text-editor/MainEditor'
import Image from 'next/image'
import dummyProfile from '@/public/images/dummyProfile.png'
import { CloseMenuIcon, ErrorIcon, MessageSentIcon } from '@/staticData/Icon'
import JsonToText from '@/utils/JsonToText'
import { useSelector } from 'react-redux'
import { formatChatDateAndTime } from '@/utils/formateDateAndTime'
import '@/components/text-editor/tiptapstyle.css'
import { makeCapitalize } from '@/utils/StatusColor'
import { sendMessageChat } from '@/api/chatApi'
import { findOrCreateChatNotification } from '@/api/notificationApi'
import { socket } from '@/components/others/Header'

export const initialText = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
}

const InboxAndMessaging = ({ to, itemData, chatData, messageCount }) => {
  const [chat, setChat] = useState(chatData)
  const [text, setText] = useState(initialText)
  const [onlineUsers, setOnlineUsers] = useState(new Set())
  const [groupedParticipants, setGroupedParticipants] = useState(
    chat?.participants
  )
  const [open, setOpen] = useState(false)

  const messagesEndRef = useRef(null)
  const { userInfo } = useSelector((state) => state?.user)

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.lastElementChild?.scrollIntoView()
    }
  }, [messagesEndRef])

  const handleMessageSend = async () => {
    const message = {
      sender: {
        senderType: userInfo?.creatorId ? 'Team' : 'User',
        senderId: userInfo?._id,
      },
      receiver: chat.participants.map((participant) => participant._id),
      id: itemData?._id,
      content: text,
      title: itemData?.title,
      type: makeCapitalize(to),
      idDetails: { __t: itemData?.__t },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    socket.emit('sendMessage', message)

    setChat((prevChat) => ({
      ...prevChat,
      messages: [...prevChat?.messages, message],
    }))
    setText(initialText)

    await sendMessageChat(
      to,
      chat?._id,
      {
        sender: {
          senderType: userInfo?.creatorId ? 'Team' : 'User',
          senderId: userInfo?._id,
        },
        content: text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      userInfo?.token
    )

    await findOrCreateChatNotification(
      {
        type: makeCapitalize(to),
        title: text,
        content: itemData?.title,
        idDetails: { __t: itemData?.__t },
        sender: {
          senderType: userInfo?.creatorId ? 'Team' : 'User',
          senderId: userInfo?._id,
        },
        receivers: chat?.participants
          ?.map((item) => {
            return {
              userId: item?._id,
              type:
                item?.role === 'admin' || item?.role === 'user'
                  ? 'User'
                  : 'Team',
            }
          })
          .filter((i) => i?.userId !== userInfo?._id),
      },
      itemData?._id
    )
  }

  useEffect(() => {
    const handleOnlineUsers = ({ onlineUsers }) => {
      setOnlineUsers(new Set(onlineUsers))
    }

    socket.on('online-users', handleOnlineUsers)

    if (userInfo?._id && itemData?._id) {
      socket.emit('add-user', { id: itemData?._id, userId: userInfo?._id })
    }

    return () => {
      socket.off('online-users', handleOnlineUsers)
    }
  }, [userInfo?._id, itemData?._id])

  useEffect(() => {
    const handleNewMessage = (message) => {
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat?.messages, message],
      }))
    }

    scrollToBottom()
    socket.on('message', handleNewMessage)

    return () => {
      socket.off('message', handleNewMessage)
    }
  }, [text, chat])

  useEffect(() => {
    const groupParticipants = () => {
      const grouped = {}
      chat?.participants?.forEach((participant) => {
        const role = participant?.role
        if (!grouped[role]) {
          grouped[role] = []
        }
        grouped[role].push(participant)
      })
      setGroupedParticipants(grouped)
    }

    groupParticipants()
  }, [chat])

  if (!chatData) {
    return (
      <h1 className="font-bold italic text-xl text-gray-400 bg-white text-center p-6 rounded-xl">
        No Chat Available
      </h1>
    )
  }

  return (
    <div className="grid items-start bg-white rounded-[10px] w-full overflow-hidden board-shadow">
      <div className="grid bg-[#d0d0ff] relative">
        <div
          className="flex items-center py-3 px-4 cursor-pointer gap-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          {chat?.participants?.map((item, i) => (
            <div className="w-[40px] relative" key={i}>
              <Image
                src={item?.profileImage || dummyProfile}
                alt="img"
                width={40}
                height={40}
                className="h-[40px] rounded-full bg-[#0000ffc9] object-cover"
              />
              {onlineUsers.has(item?._id) && (
                <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-[#d0d0ff] absolute right-0 bottom-0" />
              )}
            </div>
          ))}
          <div
            className={`${
              open ? 'rotate-[267deg]' : 'rotate-180'
            } transition-all duration-300 ease-in-out`}
          >
            <CloseMenuIcon size={24} color={'#6e79ff'} />
          </div>
        </div>
        <div
          className={`grid items-center absolute bg-[#d0d0ff] mt-16 px-4 rounded-b-xl transition-all duration-500 ease-in-out overflow-hidden z-10 ${
            open ? 'max-h-[500px] overflow-y-scroll pb-16' : 'max-h-0'
          }`}
        >
          {Object.entries(groupedParticipants)?.map(
            ([role, participantsInRole]) => (
              <div key={role}>
                <h2 className="text-base font-semibold mb-3 mt-5 px-3 border-l-4 border-blue-500">
                  {makeCapitalize(role.replace(/([a-z])([A-Z])/g, '$1 $2'))}
                </h2>
                {Array.isArray(participantsInRole) &&
                  participantsInRole.map((participant, i) => (
                    <div key={i} className="flex items-center gap-3 mb-3 px-3">
                      <div className="w-[30px] relative">
                        <Image
                          src={participant?.profileImage || dummyProfile}
                          alt="img"
                          width={30}
                          height={30}
                          className="h-[30px] rounded-full bg-[#7136ff36] object-cover"
                        />
                        {onlineUsers.has(participant?._id) && (
                          <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-[#d0d0ff] absolute right-0 bottom-0" />
                        )}
                      </div>
                      <div className="grid lg:gap-1">
                        <h1 className="text-sm font-semibold">
                          {participant?.fullName}
                        </h1>
                        <h4 className="font-semibold text-xs text-gray-600">
                          {participant?.position || 'Project Manager'}
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
      </div>
      <div className="min-h-[300px]">
        <div
          className="grid gap-6 w-full text-sm md:max-h-[500px] max-h-[390px] overflow-y-scroll pt-6 sm:px-6 px-4 scroll-smooth"
          ref={messagesEndRef}
        >
          {chat?.messages && chat?.messages.length > 0 ? (
            <>
              {chat?.messages?.map((item, i) => {
                const senderInfo = chat.participants?.find(
                  (participant) => participant._id === item?.sender?.senderId
                )
                return (
                  <div
                    className={`flex gap-4 w-full ${
                      !senderInfo
                        ? 'opacity-50'
                        : senderInfo?._id === userInfo?._id &&
                          'flex-row-reverse'
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
                          senderInfo?._id === userInfo?._id &&
                          'flex-row-reverse'
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
                          <h1 className="font-semibold">
                            {senderInfo?.fullName || 'Unknown'}
                          </h1>
                          {typeof item?.content === 'object' ? (
                            <h2 className="text-sm tiptap">
                              {JsonToText(item?.content, false)}
                            </h2>
                          ) : (
                            <h2 className="text-sm">{item?.content}</h2>
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
      </div>

      {chat?.participants?.find(
        (participant) => participant?._id === userInfo?._id
      ) ? (
        <div className="relative sm:px-6 px-4 pb-5">
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
      ) : (
        <div className="bg-rose-700 bg-opacity-20 p-3 flex justify-center gap-1 rounded-lg font-medium text-sm">
          <ErrorIcon color={'red'} /> You are not allowed to send message here!
        </div>
      )}
    </div>
  )
}

export default InboxAndMessaging
