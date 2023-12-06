'use client'

import AddPaymentMethod from '@/components/modals/AddPaymentMethod'
import EditPaymentMethodModal from '@/components/modals/EditPaymentMethodModal'
import { useState } from 'react'

const MainBilling = ({ billingData }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  return (
    <>
      <div className="bg-white w-[768px] p-4 rounded-lg shadow">
        {billingData?.map((item, i) => (
          <div key={i} className="flex  items-start justify-start gap-3">
            <div>{item?.cardIcon}</div>
            <div className="grid">
              <h3 className="text-slate-700 text-sm font-medium">
                {item?.cardType} ending in {item?.cardNum?.slice(15, 19)}
              </h3>
              <h4 className="text-gray-500 text-sm font-normal">
                Expiry {item?.expiry}
              </h4>
              <div className="flex gap-3 pt-2">
                <h6 className="text-gray-500 text-sm font-medium">
                  Set as default
                </h6>
                <button
                  className="text-violet-700 text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenEditModal(true)
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="w-[225px] h-12 py-2 px-5 bg-blue-800 rounded-lg text-white text-base font-normal mt-9"
        onClick={(e) => setOpenModal(true)}
      >
        + Add payment method
      </button>
      {openModal && (
        <AddPaymentMethod openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openEditModal && (
        <EditPaymentMethodModal
          openModal={openEditModal}
          setOpenModal={setOpenEditModal}
        />
      )}
    </>
  )
}

export default MainBilling
