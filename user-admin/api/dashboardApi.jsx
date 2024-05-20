import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const getAllSearchCollectionsApi = async (queryData) => {
  try {
    const data = await axios.get(`${host}/api/dashboard`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}
