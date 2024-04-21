import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const createHourlyTimeLogsApi = async (sendData, id) => {
  const data = await axios.put(
    `${host}/api/order/hourlyService/hourlyTimeLogs/${id}`,
    sendData
  )
  return data?.data
}

export const updateHourlyTimeLogApi = async (sendData, link) => {
  const data = await axios.put(
    `${host}/api/order/hourlyService/hourlyTimeLogs/${link}`,
    sendData
  )
  return data?.data
}

export const deleteHourlyTimeLogApi = async (sendData, link) => {
  const data = await axios.delete(
    `${host}/api/order/hourlyService/hourlyTimeLogs/${link}`,
    sendData
  )
  return data?.data
}
