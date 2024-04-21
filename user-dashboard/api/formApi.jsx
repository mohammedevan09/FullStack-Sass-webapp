import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const getFormById = async (id) => {
  try {
    const data = await axios.get(`${host}/api/form/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}
