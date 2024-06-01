'use client'

import { useState } from 'react'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import {
  CheckSignIcon3,
  ManualPaymentIcon,
  PaymentCardIcon,
} from '@/staticData/Icon'
import { Input2 } from '@/components/others/Input'

const CheckoutModal = ({
  setOpenModal,
  openModal,
  handleCheckOutButton,
  setValue,
  isSubmitting,
}) => {
  const [active, setActive] = useState('manually')

  const pricing = [
    {
      title: 'Manually',
      desc: 'Pay manually/ Pay later',
      icon: <ManualPaymentIcon />,
      value: 'manually',
    },
    {
      title: 'Credit/Debit Card',
      desc: 'Mastercard, Visa, Amex',
      icon: <PaymentCardIcon />,
      value: 'card',
    },
    // {
    //   title: 'Paypal',
    //   desc: 'One Click Paypal payment',
    //   icon: <PaypalIcon />,
    //   value: 'paypal',
    // },
  ]

  const handleCheckout = async () => {
    setValue('payment_method_types', active)
    await handleCheckOutButton()
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 sm:px-12 px-8 rounded-[20px] w-full">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto">
          Checkout
        </h3>
        <div className="w-full h-[0px] border border-neutral-300 mt-3 mb-6"></div>
        {/* <div className="my-5 text-center">
          <h3 className="font-bold text-blue-800">Plan Name : </h3>
          <p>{formData?.title}</p>
        </div> */}

        <div className="mb-10 flex items-center gap-2">
          <Input2
            placeholder={'Enter Coupon Code (Optional)'}
            type={'text'}
            className={'h-[47px]'}
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-blue-800 rounded-[9px] w-[105px] h-[47px] text-white text-lg font-semibold leading-7 flex justify-center items-center"
            // onClick={() => setOpenModal(false)}
          >
            Apply
          </motion.button>
        </div>

        <div className="grid gap-4">
          {pricing?.map((item, i) => (
            <div
              key={i}
              className={`flex justify-between sm:py-5 py-4 sm:px-6 px-4 rounded-xl border-2 cursor-pointer ${
                active === item?.value ? 'border-blue-800' : 'border-gray-300'
              }`}
              onClick={() => setActive(item?.value)}
            >
              <div className="flex items-center sm:gap-6 gap-3">
                <div
                  className={`sm:w-10 w-8 sm:h-10 h-8 ${
                    active === item?.value ? 'bg-blue-800' : 'bg-white'
                  } rounded-full flex items-center justify-center`}
                >
                  <CheckSignIcon3 color={active === item?.value && 'white'} />
                </div>
                <div className="grid sm:gap-1">
                  <h3 className="text-slate-900 sm:text-lg text-base font-semibold leading-7 flex justify-start items-center gap-2">
                    {item?.title} {item?.icon}
                  </h3>
                  <h4 className="text-zinc-500 sm:text-base text-sm font-normal leading-relaxed">
                    {item?.desc}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid items-center gap-3 mt-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleCheckout()}
            disabled={isSubmitting}
          >
            {active === 'card' || active === 'paypal'
              ? 'Go to Checkout'
              : 'Pay later / Confirm order'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full p-4 text-blue-800 rounded-[9px] text-lg font-semibold leading-7"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default CheckoutModal
