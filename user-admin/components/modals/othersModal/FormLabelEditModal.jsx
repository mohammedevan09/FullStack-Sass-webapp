'use client'

import { motion } from 'framer-motion'
import WrappingModal from '../WrappingModal'

const FormLabelEditModal = ({
  openModal,
  setOpenModal,
  handleNewLabel,
  newName,
  setNewName,
}) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px]">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto mb-8">
          Edit the Label
        </h3>
        <div className="grid gap-5">
          <div className="grid">
            <input
              id={'label'}
              placeholder={newName}
              type={'text'}
              className={
                'sm:w-[472.44px] xs:w-[406px] w-[340px] text-sm rounded-[4px] h-[48px] border-zinc-400 font-medium placeholder:font-normal border px-4 text-center'
              }
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid items-center gap-3 mt-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-2 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            onClick={() => {
              setOpenModal(false)
              handleNewLabel()
            }}
          >
            Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full p-2 text-blue-800 rounded-[9px] text-lg font-semibold leading-7"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default FormLabelEditModal
