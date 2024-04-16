'use client'

import CancelOrderModal from '@/components/modals/orderModal/CancelOrderModal'
import EditStatus from '@/components/modals/orderModal/EditStatusModal'
import { FilterByIdIcon } from '@/staticData/Icon'
import { useState } from 'react'

const TakeAction = ({ order, setValue, setOrderData, link }) => {
  const takeActionData = [
    { title: 'Edit  Status', type: 'EDIT_STATUS' },
    order?.status !== 'canceled'
      ? { title: 'Cancel Service', type: 'CANCEL' }
      : { title: 'Renew Service', type: 'RENEW' },
  ]

  const [dropOpen, setDropOpen] = useState(false)
  const [statusModal, setStatusModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)

  const handleClick = (item) => {
    if (item?.type === 'EDIT_STATUS') {
      setStatusModal(true)
    } else if (item?.type === 'CANCEL' || 'RENEW') {
      setCancelModal(true)
    }
  }

  return (
    <>
      <div className="relative min-w-[154px]">
        <div className="bg-white grid items-center px-4 py-1 rounded-md overflow-hidden">
          <button
            className="flex items-center gap-2 text-base font-semibold"
            onClick={(e) => {
              e.preventDefault()
              setDropOpen((prev) => !prev)
            }}
          >
            Take Action <FilterByIdIcon />
          </button>
          <div
            className={`${
              dropOpen ? 'max-h-[400px]' : 'max-h-0'
            } transition-all duration-300 ease-in-out`}
          >
            {takeActionData?.map((item, i) => (
              <div
                key={i}
                className={`border-zinc-300 border-t mt-3`}
                onClick={() => handleClick(item)}
              >
                <button className="pt-2 hover:scale-105 transition font-semibold hover:text-blue-600">
                  {item?.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {statusModal && (
        <EditStatus
          order={order}
          setOrderData={setOrderData}
          setValue={setValue}
          openModal={statusModal}
          setOpenModal={setStatusModal}
          link={link}
        />
      )}
      {cancelModal && (
        <CancelOrderModal
          order={order}
          setOrderData={setOrderData}
          openModal={cancelModal}
          setOpenModal={setCancelModal}
          link={link}
        />
      )}
    </>
  )
}

export default TakeAction
