'use client'

import { CreditCardSvg, MastercardIcon } from '@/staticData/Icon'
import Labels from '../../others/Labels'
import Input from '../../others/Input'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'

const EditPaymentMethodModal = ({ setOpenModal, openModal }) => {
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white sm:pt-16 pt-8 pb-4 sm:px-24 xs:px-6 px-2 rounded-[9px] overflow-x-hidden">
        <div className="grid">
          <CreditCardSvg />
          <div className="mt-7 mb-5">
            <h2 className="text-gray-900 text-lg font-medium leading-7">
              Update payment method
            </h2>
            <h3 className="text-gray-500 text-sm font-normal">
              Update your card details.
            </h3>
          </div>
          <div className="sm:flex grid gap-4">
            <div>
              <div className="grid">
                <Labels
                  cn={'mb-2'}
                  name={'Name on card'}
                  htmlFor={'cardName'}
                />
                <Input
                  type={'text'}
                  cn={'w-[304px]'}
                  placeholder={'Olivia Rhye'}
                  id={'cardName'}
                  cnh={'h-11'}
                />
              </div>
              <div className="grid my-4">
                <Labels cn={'mb-2'} name={'Card number'} htmlFor={'cardNum'} />
                <div className="relative">
                  <Input
                    type={'text'}
                    cn={'w-[304px]'}
                    placeholder={'1234 1234 1234 1234'}
                    id={'cardNum'}
                    cnh={'h-11'}
                  />
                  <div className="absolute left-[10px] top-[12px]">
                    <MastercardIcon />
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:block flex justify-between items-start">
              <div className="grid">
                <Labels cn={'mb-2'} name={'Expiry'} htmlFor={'expires'} />
                <Input
                  type={'number'}
                  cn={'w-28'}
                  placeholder="MM / YYYY"
                  id={'expires'}
                  cnh={'h-11'}
                />
              </div>
              <div className="grid sm:my-4">
                <Labels name={'CVV'} htmlFor={'cvv'} cn={'mb-2'} />
                <Input
                  type={'password'}
                  cn={'w-28'}
                  placeholder={'123'}
                  id={'cvv'}
                  cnh={'h-11'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full gap-3 mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-1/2 py-2 px-3 text-base font-medium rounded-lg shadow border border-gray-300"
            onClick={(e) => {
              e.preventDefault()
              setOpenModal(false)
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-1/2 py-2 px-3 text-base font-medium rounded-lg shadow bg-blue-800 text-white"
            onClick={(e) => {
              e.preventDefault()
              setOpenModal(false)
            }}
          >
            Add Card
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default EditPaymentMethodModal
