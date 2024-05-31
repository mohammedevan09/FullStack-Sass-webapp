import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createHourlyTimeLogsApi = async (sendData, id, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(
    `${host}/api/order/hourlyService/hourlyTimeLogs/${id}`,
    sendData,
    {
      headers: {
        Authorization: `Bearer ${authorizedToken}`,
      },
    }
  )
  return data?.data
}

export const updateHourlyTimeLogApi = async (sendData, link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(
    `${host}/api/order/hourlyService/hourlyTimeLogs/${link}`,
    sendData,
    {
      headers: {
        Authorization: `Bearer ${authorizedToken}`,
      },
    }
  )
  return data?.data
}

export const deleteHourlyTimeLogApi = async (sendData, link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const response = await axios.delete(
    `${host}/api/order/hourlyService/hourlyTimeLogs/${link}`,
    {
      headers: {
        Authorization: `Bearer ${authorizedToken}`,
      },
      data: sendData,
    }
  )
  return response?.data
}
