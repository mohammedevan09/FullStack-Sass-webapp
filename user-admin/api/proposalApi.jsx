import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createProposalApi = async (sendData) => {
  const data = await axios.post(`${host}/api/proposal`, sendData)
  return data?.data
}

export const getAllProposals = async (queryData) => {
  try {
    const data = await axios.get(`${host}/api/proposal`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const getProposalByIdApi = async (id) => {
  try {
    const data = await axios.get(`${host}/api/proposal/${id}`)
    return data?.data
  } catch (error) {
    return {}
  }
}

export const updateProposalApi = async (sendData, link) => {
  const data = await axios.put(`${host}/api/proposal/${link}`, sendData)
  return data?.data
}

export const deleteProposalApi = async (link) => {
  const data = await axios.delete(`${host}/api/proposal/${link}`)
  return data?.data
}
