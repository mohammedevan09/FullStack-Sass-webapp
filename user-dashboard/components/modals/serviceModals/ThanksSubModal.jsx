'use client'

import { CheckIcon, OpenInboxIcon } from '@/staticData/Icon'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const ThanksSubModal = ({ setOpenModal, setOpenSubModal }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e) => {
    e.preventDefault()
    setOpenSubModal(false)
    setOpenModal(false)
    if (pathname.endsWith('/hourlyPlan')) {
      router.push('/dashboard/hourly-plan/1234')
    } else {
      router.push('/dashboard/all-projects/1234')
    }
  }
  return (
    <div className="fixed z-[9999999999] left-0 top-0 right-0 bottom-0 modal-b-blur h-screen w-screen overflow-hidden flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="grid gap-7 justify-center items-center bg-white rounded-[20px] shadow pt-10 pb-5 px-10 overflow-x-hidden">
          <div className="mb-3">
            <CheckIcon />
            <div className="text-gray-900 text-lg font-medium leading-7 mx-auto text-center">
              Thanks!
            </div>
            <div className="text-gray-500 text-sm font-normal leading-tight">
              Your Request has been placed, you’ll be notified soon.
            </div>
          </div>
          <div className="mb-5 mx-auto">
            <motion.button
              whileHover={{ scale: 1.08 }}
              className="w-[181px] h-11 px-[18px] py-2.5 bg-white rounded-lg shadow border border-indigo-800 text-indigo-800 text-base font-medium flex items-center justify-center gap-2"
              onClick={handleClick}
            >
              <OpenInboxIcon /> Open Inbox
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThanksSubModal
