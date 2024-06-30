import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const getAllInvoices = async (queryData) => {
  try {
    const data = await axios.get(`${host}/api/invoice`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const payNowOrderOrProposalApi = async (sendData, link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(`${host}/api/invoice/pay/${link}`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

export const getInvoiceByIdApi = async (id, queryData) => {
  try {
    const data = await axios.get(`${host}/api/invoice/${id}`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return {}
  }
}
