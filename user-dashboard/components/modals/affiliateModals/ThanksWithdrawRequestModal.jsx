'use client'

import { CheckIcon, OpenInboxIcon } from '@/staticData/Icon'
import { motion } from 'framer-motion'

const ThanksWithdrawRequestModal = ({ setOpenSubModal, setOpenModal }) => {
  return (
    <div className="flex justify-center items-center fixed z-[9999999999] w-screen h-screen left-0 top-0 right-0 bottom-0 modal-b-blur">
      <div className="grid gap-7 justify-center items-center bg-white rounded-[20px] shadow pt-10 pb-5 px-10">
        <div className="mb-3">
          <CheckIcon />
          <div className="text-gray-900 text-lg font-medium leading-7 mx-auto text-center">
            Thanks!
          </div>
          <div className="text-gray-500 text-sm font-normal leading-tight sm:w-[402px] w-full mx-auto text-center">
            We’ll contact you for verification & we’ll email you once the
            payment has been processed.
          </div>
        </div>
        <div className="mb-5 mx-auto">
          <motion.button
            whileHover={{ scale: 1.08 }}
            className="w-[181px] h-11 px-[18px] py-2.5 bg-white rounded-lg shadow border border-indigo-800 text-indigo-800 text-base font-medium flex items-center justify-center gap-2"
            onClick={(e) => {
              e.preventDefault()
              setOpenSubModal(false)
              setOpenModal(false)
            }}
          >
            <OpenInboxIcon /> Go to Affiliate
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ThanksWithdrawRequestModal
