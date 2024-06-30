'use client'

import { Input2 } from '@/components/others/Input'
import WrappingModal from './WrappingModal'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

const DeleteModal = ({
  openModal,
  setOpenModal,
  deleteDataName,
  api,
  isNotDeletableMessage,
}) => {
  const [value, setValue] = useState('')

  const handleClick = async () => {
    if (value === deleteDataName) {
      try {
        await api()
        toast.success(`${deleteDataName} is deleted!`)
        setOpenModal(false)
      } catch (error) {
        toast.error(`Cannot delete ${deleteDataName}`)
        setOpenModal(false)
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-8 pb-6 px-8 rounded-[20px] relative w-full">
        {isNotDeletableMessage ? (
          <>
            <h3 className="sm:text-2xl text-base font-semibold tracking-tight mx-auto mb-4">
              Sorry, You cannot delete this!
            </h3>
            <label
              htmlFor={'name'}
              className={`sm:text-base text-sm font-semibold tracking-tight opacity-80 text-justify mb-4`}
            >
              <span className="font-bold text-rose-600">{deleteDataName}</span>{' '}
              {isNotDeletableMessage}
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full py-2 px-2 border-2 border-blue-600 rounded-[9px] text-blue-600 text-lg font-semibold"
              onClick={() => {
                setOpenModal(false)
              }}
            >
              Close
            </motion.button>
          </>
        ) : (
          <>
            <h3 className="sm:text-2xl text-base font-semibold tracking-tight mx-auto mb-8">
              Are you sure you want to delete?
            </h3>
            <div className="grid gap-2">
              <label
                htmlFor={'name'}
                className={`sm:text-base text-sm font-semibold tracking-tight mb-1 text-center`}
              >
                Type the name{' '}
                <span className="font-bold text-rose-600">
                  {deleteDataName}
                </span>{' '}
                to delete
              </label>
              <Input2
                id={'name'}
                placeholder={`Ex - ${deleteDataName}`}
                type={'text'}
                validationRules={{
                  onChange: (e) => setValue(e.target.value),
                }}
              />
            </div>

            <div className="flex items-center gap-3 mt-8 mb-3">
              <motion.button
                whileHover={{ scale: 1.15 }}
                className="w-full py-2 text-blue-800 rounded-[9px] text-lg font-semibold leading-7"
                onClick={() => {
                  setOpenModal(false)
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="w-full py-2 px-2 bg-rose-600 rounded-[9px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleClick()}
                disabled={value !== deleteDataName}
              >
                Delete
              </motion.button>
            </div>
          </>
        )}
      </div>
    </WrappingModal>
  )
}

export default DeleteModal
