'use client'

import { Input2 } from '@/components/Input'
import { LabelsTwo } from '@/components/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import YesNoRadioInput from '@/components/YesNoRadioInput'

const MaintenancePlansModal = ({ setOpenModal, openModal }) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-16 pb-4 sm:px-24 xs:px-6 px-2 rounded-[20px] overflow-x-hidden">
        <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
          Provide project details & questionnaire
        </h3>
        <div className="w-full h-[0px] border border-neutral-400 mt-5 mb-14"></div>
        <div className="grid gap-5">
          <div className="grid">
            <LabelsTwo htmlFor={'project-title'} name={'Project Title'} />
            <Input2
              id={'project-title'}
              placeholder={'Ex: Andrea’s personal web development'}
              type={'text'}
            />
          </div>
          <div className="grid">
            <LabelsTwo
              htmlFor={'website-login-url'}
              name={'Website login URL'}
            />
            <Input2
              id={'website-login-url'}
              placeholder={'Example: https://yoursite.com/wp-admin.php?'}
              type={'text'}
            />
          </div>
          <div className="grid">
            <LabelsTwo htmlFor={'User-name/email'} name={'User name/Email'} />
            <Input2
              id={'User-name/email'}
              placeholder={'Example: https://yoursite.com/wp-admin.php?'}
              type={'email'}
            />
          </div>
          <div className="grid">
            <LabelsTwo htmlFor={'password-project'} name={'Password'} />
            <Input2
              id={'password-project'}
              placeholder={'Example: https://yoursite.com/wp-admin.php?'}
              type={'password'}
            />
          </div>

          <div className="grid gap-9 mt-10">
            <YesNoRadioInput
              name={
                'Do you need a virtual meeting for this project discussion?'
              }
              radioFor={'virtual-meeting'}
              // yesClick={() =>
              //   handleRadioChange('additionalOptions[2].value', 'true')
              // }
              // noClick={() =>
              //   handleRadioChange('additionalOptions[2].value', 'false')
              // }
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
            Checkout Now
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

export default MaintenancePlansModal
