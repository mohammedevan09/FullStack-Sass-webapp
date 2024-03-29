'use client'

import StatusModal from '@/components/modals/serviceModal/StatusModal'
import { useState } from 'react'
import toast from 'react-hot-toast'

const StatusAction = ({ service, handleSubmit, setValue, setServiceData }) => {
  const [statusModal, setStatusModal] = useState(false)

  const handleClick = (data) => {
    if (data?.pricing?.length >= 3) {
      if (!data?.isActive && (!data?.form || data?.form == '')) {
        setStatusModal(false)
        return toast.error('Form is required!')
      } else {
        setServiceData({ ...data, isActive: !data?.isActive })
        setValue('isActive', !data?.isActive, { shouldDirty: true })
        setStatusModal(false)
      }
    } else {
      toast.error('Atleast 3 pricing details required for active this service!')
    }
  }

  return (
    <>
      <button
        className={`flex w-[135px] items-center gap-2 text-base py-1 px-4 rounded-md font-semibold hover:scale-105 transition text-white ${
          service?.isActive ? 'bg-rose-500' : 'bg-blue-600'
        }`}
        // onClick={handleSubmit(handleClick)}
        onClick={() => setStatusModal(true)}
      >
        <div className={`w-2.5 h-2.5 rounded-full bg-white`} />
        {!service?.isActive ? 'On' : 'Off'} Status
      </button>
      {statusModal && (
        <StatusModal
          serviceData={service}
          handleClick={handleSubmit(handleClick)}
          openModal={statusModal}
          setOpenModal={setStatusModal}
        />
      )}
    </>
  )
}

export default StatusAction
