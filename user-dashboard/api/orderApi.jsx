import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createOrderApi = async (sendData, link) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.post(`${host}/api/order/${link}`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

export const getAllOrders = async (queryData, id = '') => {
  try {
    const data = await axios.get(`${host}/api/order/${id}`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const updateOrderApi = async (sendData, link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(`${host}/api/order/${link}`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}
