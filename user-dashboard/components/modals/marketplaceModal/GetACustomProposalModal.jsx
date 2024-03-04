'use client'

import { Input2 } from '@/components/Input'
import { LabelsTwo } from '@/components/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import YesNoRadioInput from '@/components/YesNoRadioInput'

const GetACustomProposalModal = ({
  setOpenSubModal,
  setOpenModal,
  openModal,
}) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-16 pb-4 sm:px-24 xs:px-6 px-2 overflow-x-hidden rounded-[20px]">
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
              htmlFor={'Describe-the-projects'}
              name={'Describe the projects.'}
            />
            <Input2
              id={'Describe-the-projects'}
              placeholder={'Example: its an salon business in new York etc.'}
              type={'text'}
              cnh={'h-[81.66px]'}
            />
          </div>
          <div className="grid">
            <LabelsTwo htmlFor={'budget'} name={'Budget'} />
            <Input2 id={'budget'} placeholder={'Ex: 800-1000$'} type={'text'} />
          </div>

          <YesNoRadioInput
            name={'Do you need a virtual meeting for this project discussion?'}
            radioFor={'virtual-meeting'}
            // yesClick={() =>
            //   handleRadioChange('additionalOptions[2].value', 'true')
            // }
            // noClick={() =>
            //   handleRadioChange('additionalOptions[2].value', 'false')
            // }
          />
        </div>
        <div className="grid items-center gap-3 mt-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            onClick={(e) => {
              e.stopPropagation()
              setOpenSubModal(true)
            }}
          >
            Send me a custom proposal
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

export default GetACustomProposalModal
