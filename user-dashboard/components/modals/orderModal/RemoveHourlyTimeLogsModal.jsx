'use client'

import Input from '@/components/others/Input'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { deleteHourlyTimeLogApi } from '@/api/hourlyTimeLogsApi'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const RemoveHourlyTimeLogsModal = ({
  openModal,
  setOpenModal,
  handleSubmit,
  order,
  logsLength,
}) => {
  const { userInfo } = useSelector((state) => state?.user)

  const [value, setValue] = useState('')

  const handleDelete = async (data) => {
    if (value === order?.title) {
      try {
        toast.loading('Processing, please wait!', { duration: 600 })
        await deleteHourlyTimeLogApi(
          order?.hourlyTimeLogs?.[logsLength],
          `${order?._id}/${order?.hourlyTimeLogs?.[logsLength]?._id}`,
          userInfo?.token
        )

        toast.success('Removed Hourly Time log updated!')
        window.location.reload()
      } catch (error) {
        toast.error('Sorry cannot remove!')
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 sm:px-12 px-8 rounded-[20px] w-full">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto mb-8">
          Are you sure you want to remove?
        </h3>
        <div className="grid gap-2">
          <label
            htmlFor={'name'}
            className={`text-base font-semibold tracking-tight mb-1`}
          >
            Type the service Title{' '}
            <span className="font-bold text-rose-600">{order?.title}</span> to
            remove
          </label>
          <Input
            id={'name'}
            placeholder={'Service Name'}
            type={'text'}
            cn={'w-full'}
            cnb={'rounded-[6px]'}
            cnh={'h-[50px]'}
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
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full py-2 px-2 bg-rose-600 rounded-[9px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit(handleDelete)}
            disabled={value !== order?.title}
          >
            Remove
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default RemoveHourlyTimeLogsModal
