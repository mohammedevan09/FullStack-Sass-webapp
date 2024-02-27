'use client'

import { useState } from 'react'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import { CheckSignIcon3 } from '@/staticData/Icon'

const CheckoutModal = ({ setOpenModal, openModal }) => {
  const [active, setActive] = useState(0)

  const pricing = [
    {
      title: 'Credit/Debit Card',
      price: 'Mastercard, Visa, Amex',
      icon: <CheckSignIcon3 />,
    },
    {
      title: 'Paypal',
      price: 'One Click Paypal payment',
      icon: <CheckSignIcon3 />,
    },
  ]
  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-16 pb-4 px-24 rounded-[20px]">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto">
          Checkout
        </h3>
        <div className="w-full h-[0px] border border-neutral-400 mt-3"></div>
        <div className="my-5">
          <h3 className="font-bold text-blue-800">Plan Name : </h3>
          <p>Andrea’s personal website development</p>
        </div>

        <div className="grid gap-4">
          {pricing?.map((item, i) => (
            <div
              key={i}
              className={`flex justify-between sm:py-5 py-4 sm:px-6 px-4 rounded-xl border-2 cursor-pointer ${
                active === i ? 'border-blue-800' : 'border-white'
              }`}
              onClick={() => setActive(i)}
            >
              <div className="flex items-center sm:gap-6 gap-3">
                <div
                  className={`sm:w-10 w-8 sm:h-10 h-8 ${
                    active === i ? 'bg-blue-800' : 'bg-white'
                  } rounded-full flex items-center justify-center`}
                >
                  <CheckSignIcon3 color={active === i && 'white'} />
                </div>
                <div className="grid sm:gap-1">
                  <h3 className="text-slate-900 sm:text-lg text-base font-semibold leading-7">
                    {item?.title}
                  </h3>
                  <h4 className="text-zinc-500 sm:text-base text-sm font-normal leading-relaxed">
                    {item?.price}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid items-center gap-3 mt-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            onClick={() => setOpenModal(false)}
          >
            Go to Checkout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full p-4 text-blue-800 rounded-[9px] bg-white text-lg font-semibold leading-7"
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
