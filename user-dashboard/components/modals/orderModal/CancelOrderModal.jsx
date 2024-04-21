'use client'

import Input from '@/components/others/Input'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateOrderApi } from '@/api/orderApi'

const CancelOrderModal = ({
  openModal,
  setOpenModal,
  order,
  link,
  setOrderData,
}) => {
  const [value, setValue] = useState('')

  const handleClick = async () => {
    if (value === order?.title) {
      try {
        const updated = await updateOrderApi(
          {
            status: order?.status === 'canceled' ? 'running' : 'canceled',
          },
          link
        )
        setOrderData(updated)
        toast.success(
          `${
            order?.status === 'canceled' ? 'Renew' : 'Cancel'
          } Canceled successfully!`
        )
        setOpenModal(false)
      } catch (error) {
        toast.error(
          `Sorry cannot ${order?.status === 'canceled' ? 'Renew' : 'Cancel'}!`
        )
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto mb-8">
          Are you sure you want to{' '}
          {order?.status === 'canceled' ? 'Renew' : 'Cancel'}?
        </h3>
        <div className="grid gap-2">
          <label
            htmlFor={'name'}
            className={`text-base font-semibold tracking-tight mb-1`}
          >
            Type the service Title{' '}
            <span className="font-bold text-rose-600">{order?.title}</span> to{' '}
            {order?.status === 'canceled' ? 'Renew' : 'Cancel'}
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
            onClick={() => handleClick()}
            disabled={value !== order?.title}
          >
            {order?.status === 'canceled' ? 'Renew' : 'Cancel'} service
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default CancelOrderModal
