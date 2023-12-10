'use client'

import { CheckIcon, OpenInboxIcon } from '@/staticData/Icon'
import { setActiveMenu } from '@/store/reducers/activeReducer'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const ThanksInvoicePaymentPaid = ({ setOpenModal }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    setOpenModal(false)
    router.push('/dashboard/all-projects')
    dispatch(setActiveMenu(2))
  }
  return (
    <div className="flex justify-center items-center fixed z-40 w-screen h-screen left-0 top-0 right-0 bottom-0 modal-b-blur">
      <div className="grid gap-7 justify-center items-center bg-white rounded-[20px] shadow pt-10 pb-5 px-10 w-[650px]">
        <div className="mb-3">
          <CheckIcon />
          <div className="text-gray-900 text-lg font-semibold leading-7 mx-auto text-center">
            Thanks!
          </div>
          <div className="text-gray-500 text-sm font-normal leading-tight">
            You payment has been paid!
          </div>
        </div>
        <div className="mb-5 mx-auto">
          <button
            className="w-[181px] h-11 px-[18px] py-2.5 bg-white rounded-lg shadow border border-indigo-800 text-indigo-800 text-base font-medium flex items-center justify-center gap-2"
            onClick={handleClick}
          >
            <OpenInboxIcon /> Go to Projects
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThanksInvoicePaymentPaid
