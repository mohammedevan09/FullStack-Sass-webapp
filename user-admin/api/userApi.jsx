import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const adminLoginApi = async (sendData) => {
  const data = await axios.post(`${host}/api/user/adminLogin`, sendData, {
    withCredentials: true,
  })
  return data?.data
}

export const handleRefreshTokenApi = async (queryData) => {
  const data = await axios.get(`${host}/api/user/handleRefreshToken`, {
    params: queryData,
  })

  return data?.data
}

export const updateUserApi = async (sendData, token) => {
  const data = await axios.put(
    `${host}/api/user/update`,
    sendData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      withCredentials: true,
    }
  )

  return data?.data
}

export const getUserByIdApi = async (token) => {
  try {
    const data = await axios.get(`${host}/api/user/findUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })

    return data?.data
  } catch (error) {
    return error
  }
}

export const logoutUserApi = async () => {
  const data = await axios.get(`${host}/api/user/logout`, {
    withCredentials: true,
  })
  return data
}
