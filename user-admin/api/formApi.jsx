import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createFormCategoryApi = async (sendData) => {
  const data = await axios.post(`${host}/api/formCategory`, sendData)

  return data?.data
}

export const getAllFormCategory = async () => {
  try {
    const data = await axios.get(`${host}/api/formCategory`)
    return data?.data
  } catch (error) {
    return error
  }
}

export const getFormCategoryById = async (id) => {
  try {
    const data = await axios.get(`${host}/api/formCategory/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}
