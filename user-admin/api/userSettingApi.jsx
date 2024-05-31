import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const getUserSettingById = async (id) => {
  try {
    const data = await axios.put(`${host}/api/userSetting/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}

export const updateSettingByIdApi = async (sendData, id, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(
    `${host}/api/userSetting/update/${id}`,
    sendData,
    {
      headers: {
        Authorization: `Bearer ${authorizedToken}`,
      },
    }
  )
  return data?.data
}
