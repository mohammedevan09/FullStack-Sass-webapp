'use client'

import GetACustomProposalModal from '@/components/modals/marketplaceModal/GetACustomProposalModal'
import HourlyPlansModal from '@/components/modals/marketplaceModal/HourlyPlansModal'
import ThanksSubModal from '@/components/modals/marketplaceModal/ThanksSubModal'
import { CheckSignIcon2, CheckSignIcon3 } from '@/staticData/Icon'
import { useState } from 'react'
import { motion } from 'framer-motion'

const MainHourlyPlan = () => {
  const services = [
    {
      title: 'UI/UX design',
    },
    {
      title: 'Elementor  website design',
    },
    {
      title: 'Wordpress Theme Development',
    },
    {
      title: 'Woocommerce website development',
    },
    {
      title: 'Website edits, fixing, updates, maintenance',
    },
  ]
  const pricing = [
    {
      title: '30 hours development',
      price: '3000$',
      valueType: 'Best Value',
    },
    {
      title: '60 hours development',
      price: '5000$',
      valueType: '',
    },
    {
      title: 'Monthly - 3-4 hours/day',
      price: '1000$',
      valueType: '',
    },
  ]

  const [openModalCustom, setOpenModalCustom] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)

  const [active, setActive] = useState(0)
  return (
    <div className="grid justify-center items-center bg-white xs:px-11 px-6 sm:pt-12 pt-6 rounded-[15px] mb-20 2xl:w-[1111px] w-full 2xl:max-w-full max-w-[950px]">
      <div className="lg:flex grid lg:justify-center items-center gap-8">
        <div className="grid items-center lg:w-1/2 w-full">
          <h1 className="text-slate-900 sm:text-6xl text-4xl font-bold leading-[66px]">
            Try Flaro for Free
          </h1>
          <h6 className="text-gray-600 sm:text-lg text-base font-normal leading-[30px] sm:pt-5 pt-1 sm:pb-7 pb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elemen.
          </h6>
          <div className="grid sm:gap-5 xs:gap-4 gap-3 text-slate-900 text-base font-semibold leading-normal">
            {services?.map((item, i) => (
              <div
                className="flex gap-2 text-slate-900 sm:text-base text-[15px] font-semibold"
                key={i}
              >
                <CheckSignIcon2 />
                <div>{item?.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
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
                      {item?.title}
                    </h4>
                  </div>
                </div>
                {item?.valueType && (
                  <div className="bg-blue-800 rounded-[20px] h-8 sm:w-[100px] w-[80px] sm:flex hidden items-center text-white justify-center text-[13px] font-medium">
                    {item?.valueType}
                  </div>
                )}
              </div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full sm:py-4 py-3 text-white text-base font-semibold bg-blue-800 sm:rounded-lg rounded-md my-5"
            onClick={() => setOpenModal(true)}
          >
            Try 2 Days For Free
          </motion.button>
        </div>
      </div>
      <div className="sm:flex grid sm:justify-between sm:items-center items-start lg:p-16 py-12 px-0">
        <div className="grid lg:gap-4 gap-0">
          <h2 className="text-gray-800 md:text-3xl text-[18px] font-semibold leading-[38px]">
            Looking for custom proposals?
          </h2>
          <p className="text-blue-800 md:text-xl text-[16px] font-normal">
            No worries, we got you covered!
          </p>
        </div>
        <button
          className="px-5 py-3 Get a custom proposal rounded-lg shadow border-2 border-zinc-800  font-semibold sm:mt-0 mt-8hover:text-blue-800 hover:border-blue-800"
          onClick={() => setOpenModalCustom(true)}
        >
          Get a custom proposal
        </button>
      </div>
      {openModalCustom && (
        <GetACustomProposalModal
          openModal={openModalCustom}
          setOpenModal={setOpenModalCustom}
          openSubModal={openSubModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}
      {openSubModal && (
        <ThanksSubModal
          setOpenModal={setOpenModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}

      {openModal && (
        <HourlyPlansModal setOpenModal={setOpenModal} openModal={openModal} />
      )}
    </div>
  )
}

export default MainHourlyPlan
