'use client'

import DesignAndDevelopmentModal from '@/components/modals/marketplaceModal/DesignAndDevelopmentModal'
import GetACustomProposalModal from '@/components/modals/marketplaceModal/GetACustomProposalModal'
import { CheckSignIcon } from '@/staticData/Icon'
import { useState } from 'react'

const MainDesignAndDevPricing = ({ pricing }) => {
  const [openModalCustom, setOpenModalCustom] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="grid justify-center items-center bg-white px-11 pt-12 rounded-[15px] mb-20">
      <div className="flex justify-center items-center gap-8">
        {pricing?.map((item, i) => {
          return (
            <div
              key={i}
              className="grid justify-center items-center pricing-shadow px-6 py-10"
            >
              <h1 className="text-gray-900 text-5xl font-semibold leading-[60px] mx-auto">
                {item?.price}
              </h1>
              <div className="text-center pt-4">
                <h3 className="mx-auto text-gray-900 text-xl font-semibold leading-[30px]">
                  {item?.title}
                </h3>
                <h3 className="text-gray-500 text-base font-normal">
                  {item?.subtitle}
                </h3>
              </div>
              <div className="grid items-center justify-start gap-4 py-8">
                {item?.services?.map((subItem, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-3"
                  >
                    <CheckSignIcon />
                    <div className="text-gray-500 text-base font-normal">
                      {subItem?.title}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-[139px] h-9 bg-blue-800 rounded-lg shadow border border-blue-800 justify-center items-center inline-flex hover:bg-white hover:text-blue-800 text-white mx-auto"
                onClick={() => setOpenModal(true)}
              >
                Get started
              </button>
            </div>
          )
        })}
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
          className="px-5 py-3 Get a custom proposal rounded-lg shadow border-2 border-zinc-800  font-semibold"
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
      {openModal && <DesignAndDevelopmentModal setOpenModal={setOpenModal} />}
    </div>
  )
}

export default MainDesignAndDevPricing
