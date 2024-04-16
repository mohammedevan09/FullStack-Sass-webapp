import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createOrderChat = async (sendData) => {
  const data = await axios.post(`${host}/api/order/chat`, sendData)
  return data?.data
}

export const sendMessageOrderChat = async (id, sendData) => {
  const data = await axios.put(`${host}/api/order/chat/${id}`, sendData)
  return data?.data
}

export const getChatByOrderIdApi = async (queryData, id) => {
  try {
    const data = await axios.get(`${host}/api/order/chat/${id}`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}
