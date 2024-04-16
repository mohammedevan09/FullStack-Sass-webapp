import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createOrderApi = async (sendData, link) => {
  const data = await axios.post(`${host}/api/order/${link}`, sendData)
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

export const updateOrderApi = async (sendData, link) => {
  const data = await axios.put(`${host}/api/order/${link}`, sendData)
  return data?.data
}
