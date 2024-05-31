import IsAuthorized from '@/utils/IsAuthorized'
import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

// Form Category
export const createFormCategoryApi = async (sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.post(`${host}/api/formCategory`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })

  return data?.data
}

export const getAllFormCategory = async () => {
  try {
    const data = await axios.get(`${host}/api/formCategory`)
    return data?.data
  } catch (error) {
    return error
  }
}

export const getFormCategoryById = async (id) => {
  try {
    const data = await axios.get(`${host}/api/formCategory/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}

export const updateFormCategoryApi = async (sendData, id, token) => {
  const authorizedToken = await IsAuthorized(token)
  try {
    const data = await axios.put(`${host}/api/formCategory/${id}`, sendData, {
      headers: {
        Authorization: `Bearer ${authorizedToken}`,
      },
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const deleteFormCategoryById = async (id, token) => {
  const authorizedToken = await IsAuthorized(token)

  const data = await axios.delete(`${host}/api/formCategory/${id}`, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}

// Forms
export const createFormApi = async (sendData, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.post(`${host}/api/form`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })

  return data?.data
}

export const updateFormApi = async (sendData, id, token) => {
  const authorizedToken = await IsAuthorized(token)
  const data = await axios.put(`${host}/api/form/${id}`, sendData, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })

  return data?.data
}

export const getAllForm = async (searchParams) => {
  try {
    const data = await axios.get(`${host}/api/form`, {
      params: searchParams,
    })
    return data?.data
  } catch (error) {
    return error
  }
}

export const getFormById = async (id) => {
  try {
    const data = await axios.get(`${host}/api/form/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}

export const deleteFormById = async (id, token) => {
  const authorizedToken = await IsAuthorized(token)

  const data = await axios.delete(`${host}/api/form/${id}`, {
    headers: {
      Authorization: `Bearer ${authorizedToken}`,
    },
  })
  return data?.data
}
