'use server'

import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createServiceApi = async (link, sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.post(`${host}/api/services${link}`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })

  return data?.data
}

export const uploadSvgIcon = async (id, formData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(`${host}/api/services/upload/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })

  return data?.data
}

export const updateService = async (link, sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(`${host}/api${link}`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })

  return data?.data
}

export const deleteService = async (link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.delete(`${host}/api${link}`, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })

  return data?.data
}

export const getAllService = async (queryData) => {
  try {
    const data = await axios.get(`${host}/api/services`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const getServiceById = async (id) => {
  try {
    const data = await axios.get(`${host}/api/services/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}
