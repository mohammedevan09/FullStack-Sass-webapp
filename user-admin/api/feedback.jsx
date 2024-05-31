import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

// Feedback category
export const createFeedbackCategoryApi = async (sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.post(`${host}/api/feedbackCategory/`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

export const getAllFeedbackCategoryApi = async (queryData) => {
  const data = await axios.get(`${host}/api/feedbackCategory/`, {
    params: queryData,
  })
  return data?.data
}

export const getFeedbackCategoryByIdApi = async (link) => {
  const data = await axios.get(`${host}/api/feedbackCategory/${link}`)
  return data?.data
}

export const updateFeedbackCategoryApi = async (sendData, link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(
    `${host}/api/feedbackCategory/${link}`,
    sendData,
    {
      headers: {
        Authorization: `Bearer ${authorizedToken}`,
      },
    }
  )
  return data?.data
}

export const deleteFeedbackCategoryApi = async (link, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.delete(`${host}/api/feedbackCategory/${link}`, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

// Feedback

export const getAllFeedback = async (searchParams) => {
  try {
    const data = await axios.get(`${host}/api/feedback`, {
      params: searchParams,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const getFeedbackById = async (id) => {
  try {
    const data = await axios.get(`${host}/api/feedback/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}

export const deleteFeedbackById = async (id) => {
  try {
    const data = await axios.delete(`${host}/api/feedback/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}
