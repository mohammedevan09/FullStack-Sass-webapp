'use client'

import { LabelsTwo } from '@/components/Labels'
import WrappingModal from '../WrappingModal'
import Input from '@/components/Input'
import { motion } from 'framer-motion'

const RequestWithdrawModal = ({ openModal, setOpenModal, setOpenSubModal }) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-16 pb-4 sm:px-24 xs:px-6 px-2 overflow-x-hidden rounded-[20px]">
        <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
          Provide Payment withdraw details
        </h3>
        <div className="w-full h-[0px] border border-neutral-400 mt-5 mb-14"></div>
        <div className="grid gap-5">
          <div className="grid">
            <LabelsTwo htmlFor={'email'} name={'Your Paypal email Account'} />
            <Input
              left={true}
              id={'email'}
              placeholder={'example@youremail.com'}
              type={'email'}
              cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
              cnb={'rounded-[5px]'}
              cnh={'h-[58px]'}
            />
          </div>
        </div>
        <div className="grid items-center gap-3 mt-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            onClick={(e) => {
              e.stopPropagation()
              setOpenSubModal(true)
              setOpenModal(false)
            }}
          >
            Request Withdraw
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full p-4 text-blue-800 rounded-[9px] bg-white text-lg font-semibold leading-7"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default RequestWithdrawModal
