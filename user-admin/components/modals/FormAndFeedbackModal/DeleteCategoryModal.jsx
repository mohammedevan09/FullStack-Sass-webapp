'use client'

import { Input2 } from '@/components/others/Input'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

const DeleteCategoryModal = ({
  openModal,
  setOpenModal,
  category,
  setCategories,
  api,
}) => {
  const [value, setValue] = useState('')

  const handleClick = async () => {
    if (value === category?.name) {
      try {
        await api(category?._id)
        setCategories((prev) =>
          prev?.filter((item) => item?._id !== category?._id)
        )
        toast.success(`Your category ${category?.name} is deleted!`)
        setOpenModal(false)
      } catch (error) {
        setOpenModal(false)
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
        <h3 className="sm:text-2xl text-base font-semibold tracking-tight mx-auto mb-4">
          Are you sure you want to delete?
        </h3>
        <div className="grid gap-2">
          <label
            htmlFor={'name'}
            className={`sm:text-base text-sm font-semibold tracking-tight mb-1 text-center`}
          >
            Type the category name{' '}
            <span className="font-bold text-rose-600">{category?.name}</span> to
            delete
          </label>
          <Input2
            id={'name'}
            placeholder={'Category Title'}
            type={'text'}
            validationRules={{
              onChange: (e) => setValue(e.target.value),
            }}
          />
        </div>

        <div className="flex items-center gap-3 mt-14 mb-3">
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
            disabled={value !== category?.name}
          >
            Delete
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default DeleteCategoryModal
