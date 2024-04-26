'use client'

import Input from '@/components/others/Input'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { updateOrderApi } from '@/api/orderApi'
import { deleteHourlyTimeLogApi } from '@/api/hourlyTimeLogsApi'
import { useState } from 'react'
import {
  addTime,
  calculateTotalTime,
  subtractTime,
} from '@/app/(pages)/dashboard/all-projects/_components/HourlyTimeLogs'

const RemoveHourlyTimeLogsModal = ({
  openModal,
  setOpenModal,
  reset,
  handleSubmit,
  setOrderData,
  order,
  logsLength,
}) => {
  const [value, setValue] = useState('')

  const handleDelete = async (data) => {
    if (value === order?.title) {
      try {
        let totalTimeString = calculateTotalTime(
          order?.hourlyTimeLogs?.[logsLength]?.startTime,
          order?.hourlyTimeLogs?.[logsLength]?.endTime
        )
        await deleteHourlyTimeLogApi(
          order?.hourlyTimeLogs?.[logsLength],
          `${order?._id}/${order?.hourlyTimeLogs?.[logsLength]?._id}`
        )

        const updated = await updateOrderApi(
          {
            remainHours: addTime(order?.remainHours, totalTimeString),
            spentHours: subtractTime(order?.spentHours, totalTimeString),
          },
          `hourlyService/${order?._id}`
        )
        const filteredHourlyTimeLogs = order?.hourlyTimeLogs.filter(
          (_, index) => index !== logsLength
        )

        setOrderData({
          ...updated,
          hourlyTimeLogs: filteredHourlyTimeLogs,
        })
        reset()
        setOpenModal(false)
        toast.success('Removed Hourly Time log updated!')
      } catch (error) {
        toast.error('Sorry cannot remove!')
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
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
