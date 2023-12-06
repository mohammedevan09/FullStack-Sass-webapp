import { CheckIcon } from '@/staticData/Icon'
import React from 'react'

const TeamMemberAddedModal = ({
  successModal,
  setSuccessModal,
  setOpenModal,
}) => {
  return (
    <div className="flex justify-center items-center fixed z-40 w-screen h-screen left-0 top-0 right-0 bottom-0 modal-b-blur">
      <div className="grid gap-7 justify-center items-center bg-white rounded-[20px] shadow pt-10 px-6">
        <div className="mb-3">
          <CheckIcon />
          <div className="text-gray-900 text-lg font-medium leading-7 mx-auto text-center">
            Team member hs been added!
          </div>
          <div className="text-gray-500 text-sm font-normal leading-tight">
            A confirmation email has been sent to your team member!
          </div>
        </div>
        <div className="mb-5 mx-auto">
          <button
            className="w-[181px] h-11 px-[18px] py-2.5 bg-white rounded-lg shadow border border-blue-800 text-blue-800 text-base font-medium"
            onClick={(e) => {
              e.preventDefault()
              setSuccessModal(false)
              setOpenModal(false)
            }}
          >
            Ok Thanks!
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamMemberAddedModal
