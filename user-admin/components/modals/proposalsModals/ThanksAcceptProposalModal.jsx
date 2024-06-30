'use client'

import { CheckIcon, OpenInboxIcon } from '@/staticData/Icon'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const ThanksAcceptProposalModal = ({ setOpenModal }) => {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    setOpenModal(false)
    router.push('/invoice')
  }
  return (
    <div className="flex justify-center items-center fixed z-[9999999999] w-screen h-screen left-0 top-0 right-0 bottom-0 modal-b-blur">
      <div className="grid gap-7 justify-center items-center bg-white rounded-[20px] shadow pt-10 pb-5 px-10">
        <div className="mb-2">
          <CheckIcon />
          <div className="text-gray-900 text-lg font-semibold leading-7 mx-auto text-center">
            Thanks!
          </div>
          <div className="text-gray-500 text-sm font-normal leading-tight w-[400px] mx-auto text-center">
            Check your invoice page & payout the invoice! Once it’s done we’ll
            initiate the project
          </div>
        </div>
        <div className="mb-5 mx-auto">
          <motion.button
            whileHover={{ scale: 1.08 }}
            className="w-[181px] h-11 px-[18px] py-2.5 bg-white rounded-lg shadow border border-indigo-800 text-indigo-800 text-base font-medium flex items-center justify-center gap-2"
            onClick={handleClick}
          >
            <OpenInboxIcon /> Go to invoice
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ThanksAcceptProposalModal
