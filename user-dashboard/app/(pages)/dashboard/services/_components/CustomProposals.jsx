'use client'

import GetACustomProposalModal from '@/components/modals/proposalsModals/GetACustomProposalModal'
import ThanksSubModal from '@/components/modals/proposalsModals/ThanksSubModal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const CustomProposals = () => {
  const { userInfo } = useSelector((state) => state?.user)

  const [openModalCustom, setOpenModalCustom] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)

  return (
    <>
      <div className="sm:flex grid sm:justify-between items-center md:pt-20 pt-16 pb-16 px-0 gap-3">
        <div className="grid lg:gap-2 gap-0">
          <h2 className="text-gray-800 lg:text-3xl sm:text-2xl text-[18px] font-semibold">
            Looking for custom proposals?
          </h2>
          <p className="text-blue-800 lg:text-xl sm:text-lg text-[16px] font-normal">
            No worries, we got you covered!
          </p>
        </div>
        <button
          className="md:px-5 px-3 md:py-3 py-2 Get a custom proposal rounded-lg shadow border-2 border-zinc-800  font-semibold hover:text-blue-800 hover:border-blue-800"
          onClick={() => {
            if (userInfo?.creatorId) {
              toast.error('Sorry Team members cannot do that~', {
                style: {
                  padding: '6px 16px',
                  fontWeight: '500',
                },
                iconTheme: {
                  primary: '#137cff',
                },
              })
            } else {
              setOpenModalCustom(true)
            }
          }}
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
          setOpenModal={setOpenModalCustom}
          setOpenSubModal={setOpenSubModal}
          userInfo={userInfo}
        />
      )}
    </>
  )
}

export default CustomProposals
