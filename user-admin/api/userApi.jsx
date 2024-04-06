import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const adminLoginApi = async (sendData) => {
  const data = await axios.post(`${host}/api/user/adminLogin`, sendData)
  return data?.data
}

export const logoutUserApi = async () => {
  const data = await axios.get(`${host}/api/user/logout`, {
    withCredentials: true,
  })
  return data
}
