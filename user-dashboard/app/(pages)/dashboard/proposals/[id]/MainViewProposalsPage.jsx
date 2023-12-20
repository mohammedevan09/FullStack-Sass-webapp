'use client'

import ThanksAcceptProposalModal from '@/components/modals/proposalsModals/ThanksAcceptProposalModal'
import {
  AnyQuestionsIcon,
  BackButtonIcon,
  CheckSignIcon4,
  DollarSignButtonIcon,
  TimeSignButtonIcon,
} from '@/staticData/Icon'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

const MainViewProposalsPage = ({ params }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="lg:w-[942px] w-full">
      <motion.button whileHover={{ scale: 1.1 }}>
        <Link
          href={'/dashboard/proposals'}
          className="flex justify-start items-center w-[120px] gap-1 my-10 font-semibold text-xl -ml-1"
        >
          <BackButtonIcon /> Go Back
        </Link>
      </motion.button>
      <div className="sm:my-16 my-4 bg-white rounded-[15px]">
        <div className="grid sm:py-10 py-5 justify-center items-center w-full gap-3">
          <h1 className="sm:text-2xl text-xl font-semibold">
            Custom MERN website development
          </h1>
          <h5 className="text-base font-normal mx-auto">ID #{params?.id}</h5>
        </div>
        <div className="w-full border border-stone-300" />
        <div className="grid justify-center items-center gap-10 lg:mx-36 sm:mx-10 mx-5">
          <div className="grid justify-center items-center">
            <h1 className="sm:text-2xl text-xl font-semibold mx-auto sm:my-10 my-6">
              Executive Summary
            </h1>

            <p className="text-base font-normal bg-amber-400 bg-opacity-20 rounded-[15px] md:py-8 py-4 md:px-12 px-8 text-center mb-6">
              <span className="text-black text-base font-bold">
                Problem overview:{' '}
              </span>
              {`Current online store has problems with loading speeds, inventory
              management has limitations when it comes to setting up and
              managing product variations, and the current payment provider
              doesn't support all desired payment methods`}
            </p>
            <p className="text-base font-normal bg-green-500 bg-opacity-20 rounded-[15px] md:py-8 py-4 md:px-12 px-8 text-center">
              <span className="text-black text-base font-bold">
                Proposed solution:{' '}
              </span>
              Migrate Company A’s online store to our custom-built and optimized
              WordPress and WooCommerce-powered store backends
            </p>
          </div>
          <div className="grid items-center">
            <h1 className="sm:text-2xl text-xl font-semibold mx-auto sm:mn-10 mb-6">
              Scope of Work
            </h1>

            <div className="text-base font-bold bg-sky-500 bg-opacity-20 rounded-[15px] md:py-8 py-4 md:px-12 px-8 text-center mb-6">
              <p className="text-black text-base font-bold">Deliverables: </p>
              <div className="font-normal">
                {' '}
                <p>1.Store frontend design </p>
                <p>2.Inventory migration Inventory setup and configuration </p>
                <p>3.Payment gateway configuration, </p>
                <p>4.testing, and implementation </p>
              </div>
            </div>
            <div className="text-base font-bold bg-sky-500 bg-opacity-20 rounded-[15px] md:py-8 py-4 md:px-12 px-8 text-center mb-6">
              <p className="text-black text-base font-bold">
                Resources required:{' '}
              </p>
              <div className="font-normal">
                {' '}
                <p>1.Frontend designer – 120 hours</p>
                <p>2.Backend eCommerce developer – 300 hours </p>
                <p>3.Relevant licenses and software </p>
                <p>4Project manager – 80 hours</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-16 gap-6 justify-center items-center mt-9 pb-16">
          <button className="grid justify-center items-center bg-sky-500 bg-opacity-25 rounded-[20px] px-4 py-2 text-stone-900 text-lg">
            <DollarSignButtonIcon />
            <div>
              Budget: <span className="font-bold">$8500</span>
            </div>
          </button>
          <button className="grid justify-center items-center bg-green-500 bg-opacity-25 rounded-[20px] px-4 py-2 text-stone-900 text-lg">
            <TimeSignButtonIcon />
            <div>
              Timeline: <span className="font-bold">60 days</span>
            </div>
          </button>
        </div>
      </div>
      <button
        className="w-[223px] h-[51px] btn-hover rounded-[15px] text-xl font-medium flex items-center justify-center mx-auto mb-24 gap-2"
        onClick={() => setOpenModal(true)}
      >
        <CheckSignIcon4 /> Accept proposal
      </button>
      <div className="grid justify-center items-center mb-32 gap-3">
        <AnyQuestionsIcon />
        <h3 className="text-2xl font-semibold sm:mx-[14rem] xs:mx-8 mx-6 text-center">
          have any question or thinking of negotiation? Talk to us!
        </h3>
      </div>
      {openModal && <ThanksAcceptProposalModal setOpenModal={setOpenModal} />}
    </div>
  )
}

export default MainViewProposalsPage
