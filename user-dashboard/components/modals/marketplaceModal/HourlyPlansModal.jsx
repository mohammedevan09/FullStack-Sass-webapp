'use client'

import Input, { Input2 } from '@/components/others/Input'
import { LabelsTwo } from '@/components/others/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import YesNoRadioInput from '@/components/others/YesNoRadioInput'

const HourlyPlansModal = ({ setOpenModal, openModal }) => {
  const services = [
    {
      title: 'UI/UX design',
    },
    {
      title: 'Elementor website design ',
    },
    {
      title: 'Divi website design',
    },
    {
      title: 'Custom theme development',
    },
    {
      title: 'Website edits, fixes & maintenance',
    },
  ]
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-16 pb-4 px-24 rounded-[20px]">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto">
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

          <div className="grid gap-9 mt-10">
            <div className="grid gap-3">
              <LabelsTwo
                name={
                  'Do you need a virtual meeting for this project discussion?'
                }
              />
              <div className="grid gap-5">
                {services?.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-3 text-slate-600 text-sm font-normal"
                  >
                    <Input type={'checkbox'} cn={'w-5'} cnh={'h-5'} />
                    {item?.title}
                  </div>
                ))}
              </div>
            </div>
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

export default HourlyPlansModal
