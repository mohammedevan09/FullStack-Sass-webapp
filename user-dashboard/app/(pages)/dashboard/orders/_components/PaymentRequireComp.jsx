'use client'

import { renewOrCancelSubscriptionOrderApi } from '@/api/orderApi'
import { ErrorIcon } from '@/staticData/Icon'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const PaymentRequireComp = ({ params }) => {
  const router = useRouter()

  const { userInfo } = useSelector((state) => state?.user)

  const handleRenew = async (e) => {
    try {
      e.preventDefault()
      const orderData = await renewOrCancelSubscriptionOrderApi(
        {},
        params?.id,
        userInfo?.token
      )
      if (orderData?.url) {
        router.push(orderData?.url)
      } else {
        router.push(`/dashboard/orders?userId=${userInfo?._id}`)
      }
    } catch (error) {
      toast.error(<b>Cannot Renew your subscription</b>)
    }
  }

  return (
    <div className="bg-rose-400 bg-opacity-20 py-2 px-3 flex justify-between gap-4 rounded-lg font-medium text-sm mt-5 mb-8">
      <div className="flex items-center gap-1">
        <ErrorIcon color={'red'} /> Your payment is required. Subscription
        payment cannot handle manually so you have to pay using your card to run
        this project.
      </div>
      <button
        className="py-1 px-3 rounded-md font-semibold btn-hover"
        onClick={handleRenew}
      >
        Pay Now
      </button>
    </div>
  )
}

export default PaymentRequireComp
