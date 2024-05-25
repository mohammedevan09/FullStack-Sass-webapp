import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createChat = async (to, sendData) => {
  const data = await axios.post(`${host}/api/${to}/chat`, sendData)
  return data?.data
}

export const sendMessageChat = async (to, id, sendData) => {
  const data = await axios.put(`${host}/api/${to}/chat/${id}`, sendData)
  return data?.data
}

export const updateChatApi = async (to, id, sendData) => {
  const data = await axios.put(`${host}/api/${to}/chat/update/${id}`, sendData)
  return data?.data
}

export const addParticipantChatApi = async (to, id, sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(
    `${host}/api/${to}/chat/addParticipant/${id}`,
    sendData,
    {
      headers: {
        Authorization: `Bearer ${authorizedToken}`,
      },
    }
  )
  return data?.data
}

export const removeParticipantChatApi = async (to, id, sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(
    `${host}/api/${to}/chat/removeParticipant/${id}`,
    sendData,
    {
      headers: {
        Authorization: `Bearer ${authorizedToken}`,
      },
    }
  )
  return data?.data
}

export const getChatByIdApi = async (to, queryData, id) => {
  try {
    const data = await axios.get(`${host}/api/${to}/chat/${id}`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}
