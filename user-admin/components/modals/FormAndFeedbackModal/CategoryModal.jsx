'use client'

import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import ErrorMessage from '@/components/others/ErrorMessage'
import Labels from '@/components/others/Labels'
import { Input2 } from '@/components/others/Input'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const CategoryModal = ({
  openModal,
  setOpenModal,
  api,
  updateApi,
  setCategories,
  handleSubmit,
  errors,
  isSubmitting,
  isValid,
  register,
  item,
}) => {
  const { userInfo } = useSelector((state) => state?.user)

  const handleClick = async (data) => {
    if (isValid) {
      try {
        if (item === null) {
          const newData = await api(data, userInfo?.token)
          setCategories((prev) => [newData, ...prev])
          toast.success(`New category created successfully!`)
        } else {
          const updatedData = await updateApi(data, item?._id, userInfo?.token)
          setCategories((prev) =>
            prev.map((category) =>
              category._id === updatedData._id ? updatedData : category
            )
          )
          toast.success(`New category created successfully!`)
        }
        setOpenModal(false)
      } catch (error) {
        toast.error(`Category creating or updating failed!`)
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 sm:px-12 px-8 rounded-[20px] w-full">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto mb-8">
          Are a new category~
        </h3>
        <div className="grid gap-2">
          <div className="grid">
            <Labels htmlFor={'Name'} name={'Name'} />
            <Input2
              id={'Name'}
              placeholder={'Name'}
              type={'text'}
              validationRules={{
                ...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.name} />
          </div>
          <div className="grid">
            <Labels htmlFor={'Description'} name={'Description'} />
            <Input2
              id={'Description'}
              placeholder={'Description'}
              type={'text'}
              validationRules={{
                ...register('description', {
                  required: {
                    value: true,
                    message: 'Description is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.description} />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-8">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full px-4 py-2 rounded-[5px] text-blue-800 text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full px-4 py-2 bg-blue-800 rounded-[5px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleClick)}
            disabled={isSubmitting || !isValid}
          >
            Save
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default CategoryModal
