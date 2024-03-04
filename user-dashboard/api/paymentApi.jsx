import axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_HOST

export const paymentProceed = async (params) => {
  const data = await axios.post(
    `${HOST}/api/order/websiteDesignAndDev/create-checkout-session`,
    params
  )

  return data?.data
}
