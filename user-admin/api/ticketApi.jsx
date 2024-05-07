import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createTicketApi = async (sendData) => {
  const data = await axios.post(`${host}/api/ticket`, sendData)
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

export const updateTicketApi = async (sendData, link) => {
  const data = await axios.put(`${host}/api/ticket/${link}`, sendData)
  return data?.data
}

export const deleteTicketApi = async (link) => {
  const data = await axios.delete(`${host}/api/ticket/${link}`)
  return data?.data
}
