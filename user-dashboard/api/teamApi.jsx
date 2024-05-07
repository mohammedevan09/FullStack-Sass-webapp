import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createTeamApi = async (sendData) => {
  const data = await axios.post(`${host}/api/team`, sendData)
  return data?.data
}

export const loginTeamApi = async (sendData) => {
  const data = await axios.post(`${host}/api/team/login`, sendData, {
    withCredentials: true,
  })
  return data?.data
}

export const giveTeamAccessApi = async (sendData, id) => {
  const data = await axios.put(`${host}/api/team/access/${id}`, sendData)
  return data?.data
}

export const removeTeamAccessApi = async (sendData, id) => {
  const data = await axios.put(`${host}/api/team/removeAccess/${id}`, sendData)
  return data?.data
}

export const getAllTeamByCreatorIdApi = async (queryData, id) => {
  try {
    const data = await axios.get(`${host}/api/team/all/${id}`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return []
  }
}

export const getTeamByIdApi = async (id) => {
  try {
    const data = await axios.get(`${host}/api/team/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}

export const updateTeamApi = async (sendData, id) => {
  const data = await axios.put(`${host}/api/team/${id}`, sendData)
  return data?.data
}

export const deleteTeamApi = async (id) => {
  const data = await axios.delete(`${host}/api/team/${id}`)
  return data?.data
}
