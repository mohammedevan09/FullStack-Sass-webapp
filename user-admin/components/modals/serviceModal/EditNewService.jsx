'use client'

import Input from '@/components/Input'
import { motion } from 'framer-motion'
import WrappingModal from '../WrappingModal'

const EditNewService = ({ openModal, setOpenModal }) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px]">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto mb-8">
          Edit new Service
        </h3>
        <div className="grid gap-5">
          <div className="grid">
            <Input
              id={'page-heading'}
              placeholder={'Page Heading'}
              type={'text'}
              cn={'sm:w-[472.44px] xs:w-[406px] w-[340px] text-sm'}
              cnb={'rounded-[9px]'}
              cnh={'h-[58px]'}
            />
          </div>
          <div className="grid">
            <Input
              id={'price'}
              placeholder={'Price'}
              type={'number'}
              cn={'w-[150px] text-sm'}
              cnb={'rounded-[9px]'}
              cnh={'h-[58px]'}
            />
          </div>
          <div className="grid">
            <Input
              id={'page-sub-heading'}
              placeholder={'Page Sub Heading'}
              type={'text'}
              cn={'sm:w-[472.44px] xs:w-[406px] w-[340px] text-sm'}
              cnb={'rounded-[9px]'}
              cnh={'h-[58px]'}
            />
          </div>
        </div>
        <div className="grid items-center gap-3 mt-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            // onClick={() => setOpenSubModal(true)}
            onClick={() => setOpenModal(false)}
          >
            Save Service
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full p-4 text-blue-800 rounded-[9px] text-lg font-semibold leading-7"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default EditNewService
