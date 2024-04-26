'use client'

import Labels from '@/components/others/Labels'
import WrappingModal from '../WrappingModal'
import { Input2 } from '@/components/others/Input'
import { motion } from 'framer-motion'
import ErrorMessage from '@/components/others/ErrorMessage'
import { updateAffiliateApi } from '@/api/affiliateApi'
import toast from 'react-hot-toast'
import { CheckSignIcon3 } from '@/staticData/Icon'

const EditAffiliateModal = ({
  openModal,
  setOpenModal,
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
        success: <b>Edited successfully</b>,
        error: <b>Edit failed!</b>,
      })
      reset(data)
      setOpenModal(false)
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
        <h2 className="text-gray-900 sm:text-xl text-lg font-bold text-center">
          Edit This User Affiliate Account.
        </h2>
        <div className="break-words flex items-start gap-1 text-xs font-semibold my-4 text-gray-400">
          <CheckSignIcon3 size={'30'} /> If you are an admin and you have paid
          this user manually then Edit this otherwise let it be!
        </div>
        <div className="bg-blue-200 h-[1px] w-full mb-8"></div>
        <div className="grid gap-5">
          <div className="grid">
            <Labels
              htmlFor={'Payment'}
              name={'Paid Earnings of this Affiliate User'}
            />
            <Input2
              id={'Payment'}
              placeholder={'Ex - $50'}
              type={'number'}
              validationRules={{
                ...register('paidEarnings', {
                  required: {
                    value: true,
                    message: 'Paid Earnings is Required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.paidEarnings} />
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

export default EditAffiliateModal
