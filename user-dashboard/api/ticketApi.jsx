import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createTicketApi = async (sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.post(`${host}/api/ticket`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

export const getAllTickets = async (queryData) => {
  try {
    const data = await axios.get(`${host}/api/ticket`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const getTicketByIdApi = async (id) => {
  try {
    const data = await axios.get(`${host}/api/ticket/${id}`)
    return data?.data
  } catch (error) {
    return {}
  }
}

export const updateTicketApi = async (sendData, link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(`${host}/api/ticket/${link}`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

export const deleteTicketApi = async (link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.delete(`${host}/api/ticket/${link}`, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}
