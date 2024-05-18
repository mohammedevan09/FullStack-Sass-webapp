import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

// Notification
export const getAllNotification = async (queryData) => {
  try {
    const data = await axios.get(`${host}/api/notification`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const updateManyNotificationApi = async (filter, sendData) => {
  const data = await axios.put(`${host}/api/notification/`, {
    filter,
    updateData: sendData,
  })
  return data?.data
}

export const updateOneNotificationApi = async (sendData, link) => {
  const data = await axios.put(`${host}/api/notification/${link}`, sendData)
  return data?.data
}

// Message Notification
export const findOrCreateChatNotification = async (sendData, id) => {
  const data = await axios.put(
    `${host}/api/messageNotification/${id}`,
    sendData
  )
  return data?.data
}

export const getAllMessageNotification = async (queryData) => {
  try {
    const data = await axios.get(`${host}/api/messageNotification`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const readAllMessageNotificationApi = async (queryData) => {
  const queryParams = new URLSearchParams(queryData).toString()
  const data = await axios.put(`${host}/api/messageNotification?${queryParams}`)
  return data?.data
}

export const readMessageNotificationApi = async (queryData, link) => {
  const queryParams = new URLSearchParams(queryData).toString()
  const data = await axios.put(
    `${host}/api/messageNotification/read/${link}?${queryParams}`
  )
  return data?.data
}
