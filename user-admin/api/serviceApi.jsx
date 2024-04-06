import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createServiceApi = async (link, sendData) => {
  const data = await axios.post(`${host}/api/services${link}`, sendData)

  return data?.data
}

export const uploadSvgIcon = async (id, formData) => {
  const data = await axios.put(`${host}/api/services/upload/${id}`, formData)

  return data?.data
}

export const updateService = async (link, sendData) => {
  const data = await axios.put(`${host}/api${link}`, sendData)

  return data?.data
}

export const deleteService = async (link) => {
  const data = await axios.delete(`${host}/api${link}`)

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
