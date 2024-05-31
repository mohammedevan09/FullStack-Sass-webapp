'use client'

import { LabelsTwo } from '@/components/others/Labels'
import WrappingModal from '../WrappingModal'
import { Input2 } from '@/components/others/Input'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ErrorMessageTwo } from '@/components/others/ErrorMessage'
import { updateAffiliateApi } from '@/api/affiliateApi'
import toast from 'react-hot-toast'

const RequestWithdrawModal = ({
  openModal,
  setOpenModal,
  setOpenSubModal,
  register,
  isValid,
  reset,
  handleSubmit,
  errors,
  id,
}) => {
  const handleClick = async (data) => {
    if (isValid) {
      await toast.promise(updateAffiliateApi(data, id), {
        loading: 'Submitting request',
        success: <b>Your request submitted successfully</b>,
        error: <b>Your request failed!</b>,
      })
      reset(data)
      setOpenModal(false)
      setOpenSubModal(true)
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-16 pb-4 sm:px-12 px-6 overflow-x-hidden rounded-[20px]">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto">
          Provide Payment withdraw details
        </h3>
        <div className="w-full h-[0px] border border-neutral-300 mt-3 mb-8"></div>
        <div className="grid gap-5">
          <div className="grid">
            <LabelsTwo htmlFor={'email'} name={'Your Paypal email Account'} />
            <Input2
              id={'email'}
              placeholder={'example@youremail.com'}
              type={'email'}
              validationRules={{
                ...register('paymentAccounts.paypal', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Enter a valid paypal email',
                  },
                  required: {
                    value: true,
                    message: 'Paypal Email is required',
                  },
                }),
              }}
            />
            <ErrorMessageTwo errors={errors?.paymentAccounts?.paypal} />
          </div>
        </div>
        <div className="flex items-center mt-8 w-full">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full p-4 text-blue-800 rounded-[9px] text-lg font-semibold"
            onClick={(e) => {
              e.preventDefault()
              setOpenModal(false)
              reset()
            }}
          >
            Cancel
          </motion.button>{' '}
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white font-semibold xm:text-lg text-sm"
            onClick={handleSubmit(handleClick)}
          >
            Request Withdraw
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default RequestWithdrawModal
