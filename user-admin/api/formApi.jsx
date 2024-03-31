import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

// Form Category
export const createFormCategoryApi = async (sendData) => {
  const data = await axios.post(`${host}/api/formCategory`, sendData)

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

// Forms
export const createFormApi = async (sendData) => {
  const data = await axios.post(`${host}/api/form`, sendData)

  return data?.data
}

export const updateFormApi = async (sendData, id) => {
  const data = await axios.put(`${host}/api/form/${id}`, sendData)

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

export const deleteFormById = async (id) => {
  try {
    const data = await axios.delete(`${host}/api/form/${id}`)
    return data?.data
  } catch (error) {
    return error
  }
}
