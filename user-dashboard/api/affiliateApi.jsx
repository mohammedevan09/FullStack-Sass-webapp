import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createAffiliateApi = async (sendData) => {
  const data = await axios.post(`${host}/api/affiliate/`, sendData)
  return data?.data
}

export const getAffiliateByUserId = async (id) => {
  try {
    const data = await axios.get(`${host}/api/affiliate/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}

export const updateAffiliateApi = async (sendData, link) => {
  const data = await axios.put(`${host}/api/affiliate/${link}`, sendData)
  return data?.data
}

export const addVisitorsAffiliateApi = async (sendData) => {
  try {
    const data = await axios.put(`${host}/api/affiliate/addVisitor/`, sendData)
    return data?.data
  } catch (error) {
    return error
  }
}
