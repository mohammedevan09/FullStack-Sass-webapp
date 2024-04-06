import axios from 'axios'

const host = process.env.NEXT_PUBLIC_HOST

export const loginUserApi = async (sendData) => {
  const data = await axios.post(`${host}/api/user/login`, sendData, {
    withCredentials: true,
  })
  return data?.data
}

export const registerUserApi = async (sendData) => {
  const data = await axios.post(`${host}/api/user/register`, sendData, {
    withCredentials: true,
  })

  return data?.data
}

export const googleLoginUserApi = async (sendData) => {
  const data = await axios.post(`${host}/api/user/google-login`, sendData, {
    withCredentials: true,
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

export const logoutUserApi = async () => {
  const data = await axios.get(`${host}/api/user/logout`, {
    withCredentials: true,
  })
  return data
}

export const sendEmailVerificationApi = async (sendData) => {
  const data = await axios.post(
    `${host}/api/user/send-email-verification`,
    sendData,
    {
      withCredentials: true,
    }
  )
  return data
}

export const verifyYourEmail = async (id, token) => {
  const data = await axios.get(`${host}/api/user/${id}/verify/${token}`, {
    withCredentials: true,
  })
  return data
}

export const forgotPasswordApi = async (sendData) => {
  const data = await axios.post(`${host}/api/user/forgot-password`, sendData, {
    withCredentials: true,
  })
  return data
}

export const resetPasswordApi = async (id, token, sendData) => {
  const data = await axios.post(
    `${host}/api/user/reset-password/${id}/${token}`,
    sendData,
    {
      withCredentials: true,
    }
  )
  return data
}
