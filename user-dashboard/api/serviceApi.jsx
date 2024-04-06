import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

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
