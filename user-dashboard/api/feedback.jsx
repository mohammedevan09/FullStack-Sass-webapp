import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

// Feedback category
export const getAllFeedbackCategoryApi = async (queryData) => {
  try {
    const data = await axios.get(`${host}/api/feedbackCategory/`, {
      params: queryData,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

// Feedback
export const createFeedbackApi = async (sendData) => {
  const data = await axios.post(`${host}/api/feedback/`, sendData)
  return data?.data
}
