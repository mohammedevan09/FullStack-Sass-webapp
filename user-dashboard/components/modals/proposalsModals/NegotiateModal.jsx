'use client'

import { LabelsTwo } from '@/components/Labels'
import WrappingModal from '../WrappingModal'
import Input from '@/components/Input'
import { motion } from 'framer-motion'

const NegotiateModal = ({ openModal, setOpenModal, setOpenSubModal }) => {
  return (
    <WrappingModal modalOpen={openModal}>
      {' '}
      <div className="grid bg-white pt-16 pb-4 sm:px-24 xs:px-6 px-2 overflow-x-hidden rounded-[20px]">
        <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
          Enter your Bid
        </h3>
        <div className="w-full h-[0px] border border-neutral-400 mt-2 mb-6"></div>
        <div className="grid gap-5">
          <div className="grid">
            <LabelsTwo htmlFor={'Amount'} name={'Amount'} />
            <Input
              left={true}
              id={'Amount'}
              placeholder={'Ex: $5000'}
              type={'number'}
              cn={'sm:w-[570px] xs:w-[446px] w-[340px] text-sm'}
              cnb={'rounded-[5px]'}
              cnh={'h-[58px]'}
            />
          </div>
          <div className="grid">
            <LabelsTwo htmlFor={'Message'} name={'Message'} />
            <textarea
              id={'Message'}
              placeholder={
                'Ex: We got just 10 page, dont need LMS functions or any UI design draft.'
              }
              type={'text'}
              cols="30"
              rows="4"
              className="border border-gray-300 outline-none rounded-[5px] p-3 text-[14px]"
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
            Send Request
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

export default NegotiateModal
