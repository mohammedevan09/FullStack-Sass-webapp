import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const paymentProceed = async (url, params) => {
  const data = await axios.post(`${HOST}/api/order/${url}`, params)

  return data?.data
}
