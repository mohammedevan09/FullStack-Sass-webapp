import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const getAllAffiliates = async (searchParams) => {
  try {
    const data = await axios.get(`${host}/api/affiliate/`, {
      params: searchParams,
    })
    return data?.data
  } catch (error) {
    return []
  }
}

export const getAffiliateByUserId = async (id, queryData) => {
  try {
    const data = await axios.get(`${host}/api/affiliate/${id}`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const updateAffiliateApi = async (sendData, link) => {
  const data = await axios.put(`${host}/api/affiliate/${link}`, sendData)
  return data?.data
}
