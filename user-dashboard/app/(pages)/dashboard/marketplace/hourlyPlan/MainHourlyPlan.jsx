'use client'

import GetACustomProposalModal from '@/components/modals/marketplaceModal/GetACustomProposalModal'
import HourlyPlansModal from '@/components/modals/marketplaceModal/HourlyPlansModal'
import { CheckSignIcon2, CheckSignIcon3 } from '@/staticData/Icon'
import { useState } from 'react'

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

  const [active, setActive] = useState(0)
  return (
    <div className="grid justify-center items-center bg-white px-11 pt-12 rounded-[15px] mb-20">
      <div className="flex justify-center items-start gap-16">
        <div className="grid items-center w-1/2">
          <h1 className="text-slate-900 text-6xl font-bold leading-[66px]">
            Try Flaro for Free
          </h1>
          <h6 className="text-gray-600 text-lg font-normal leading-[30px] pt-5 pb-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elemen.
          </h6>
          <div className="grid gap-5 text-slate-900 text-base font-semibold leading-normal">
            {services?.map((item, i) => (
              <div
                className="flex gap-2 text-slate-900 text-base font-semibold"
                key={i}
              >
                <CheckSignIcon2 />
                <div>{item?.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <div className="grid gap-4">
            {pricing?.map((item, i) => (
              <div
                key={i}
                className={`flex justify-between py-5 px-6 rounded-xl border-2 ${
                  active === i ? 'border-indigo-500' : 'border-white'
                }`}
                onClick={() => setActive(i)}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`w-10 h-10 ${
                      active === i ? 'bg-indigo-500' : 'bg-white'
                    } rounded-full flex items-center justify-center`}
                  >
                    <CheckSignIcon3 color={active === i && 'white'} />
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-slate-900 text-lg font-semibold leading-7">
                      {item?.title}
                    </h3>
                    <h4 className="text-zinc-500 text-base font-normal leading-relaxed">
                      {item?.title}
                    </h4>
                  </div>
                </div>
                {item?.valueType && (
                  <div className="bg-indigo-500 rounded-[20px] h-8 w-[100px] flex items-center text-white justify-center text-[13px] font-medium">
                    {item?.valueType}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="w-full py-4 text-white text-base font-semibold bg-indigo-500 rounded-lg my-5"
            onClick={() => setOpenModal(true)}
          >
            Try 2 Days For Free
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center p-16">
        <div className="grid gap-4">
          <h2 className="text-gray-800 text-3xl font-semibold leading-[38px]">
            Looking for custom proposals?
          </h2>
          <p className="text-blue-800 text-xl font-normal">
            No worries, we got you covered!
          </p>
        </div>
        <button
          className="px-5 py-3 Get a custom proposal rounded-lg shadow border-2 border-zinc-800 font-semibold"
          onClick={() => setOpenModalCustom(true)}
        >
          Get a custom proposal
        </button>
      </div>
      {openModalCustom && (
        <GetACustomProposalModal
          openModal={openModalCustom}
          setOpenModal={setOpenModalCustom}
        />
      )}

      {openModal && <HourlyPlansModal setOpenModal={setOpenModal} />}
    </div>
  )
}

export default MainHourlyPlan
