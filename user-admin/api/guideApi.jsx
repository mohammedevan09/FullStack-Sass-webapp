import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createGuideApi = async (sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.post(`${host}/api/guide/`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

export const getAllGuideApi = async (queryData) => {
  const data = await axios.get(`${host}/api/guide/`, {
    params: queryData,
  })
  return data?.data
}

export const getGuideByIdApi = async (sendData, link) => {
  const data = await axios.get(`${host}/api/guide/${link}`, sendData)
  return data?.data
}

export const updateGuideApi = async (sendData, link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(`${host}/api/guide/${link}`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

export const deleteGuideApi = async (link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.delete(`${host}/api/guide/${link}`, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}
