'use client'

import { ErrorIcon } from '@/staticData/Icon'

const PaymentRequireComp = () => {
  return (
    <div className="bg-rose-400 bg-opacity-20 py-2 px-3 flex justify-start gap-1 rounded-lg font-medium text-sm mt-5 mb-8">
      <ErrorIcon color={'red'} /> This message is showing because your client
      canceled checkout after selecting. Subscription payment cannot handle
      manually so your client need to pay first to run this project.
    </div>
  )
}

export default PaymentRequireComp
