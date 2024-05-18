'use client'

import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import StatusColor from '@/utils/StatusColor'
import { useState } from 'react'
import { CheckSignIcon3, CloseMenuIcon } from '@/staticData/Icon'
import toast from 'react-hot-toast'
import { updateOrderApi } from '@/api/orderApi'

export const projectStatuses = [
  {
    title: 'pending',
  },
  {
    title: 'running',
  },
  {
    title: 'done',
  },
]

export const paymentStatuses = [
  { title: 'pending' },
  { title: 'done' },
  { title: 'canceled' },
]

const EditStatus = ({ openModal, setOpenModal, order, setOrderData, link }) => {
  const [ProjectStatus, setProjectStatus] = useState(order?.status)
  const [ProjectStatusDrop, setProjectStatusDrop] = useState(false)
  const [PaymentStatus, setPaymentStatus] = useState(order?.payment_status)
  const [PaymentStatusDrop, setPaymentStatusDrop] = useState(false)

  const handleStatusEdit = async () => {
    try {
      toast.loading('Processing, please wait!', { duration: 600 })
      const updated = await updateOrderApi(
        {
          payment_status: PaymentStatus,
          status: ProjectStatus,
        },
        link
      )
      setOrderData(updated)
      toast.success('Update successfully!')
      setOpenModal(false)
    } catch (error) {
      toast.error('Update canceled!')
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
        <h2 className="text-gray-900 text-xl font-bold text-center">
          Edit Project and Payment Status.
        </h2>
        <div className="break-words flex items-start gap-1 text-xs font-semibold my-4 text-gray-400">
          <CheckSignIcon3 size={'30'} /> Only an admin can change this. If the
          payment is proceeded by stripe then payment status edit will be hidden
          for admin as well!
        </div>
        <div className="bg-blue-100 h-[1px] w-full"></div>
        <StatusComp
          title={'Project status'}
          setStatus={setProjectStatus}
          Status={ProjectStatus}
          setStatusDrop={setProjectStatusDrop}
          StatusDrop={ProjectStatusDrop}
          statuses={projectStatuses}
        />
        {order?.payment_method_types === 'manually' && (
          <StatusComp
            title={'Payment status'}
            setStatus={setPaymentStatus}
            Status={PaymentStatus}
            setStatusDrop={setPaymentStatusDrop}
            StatusDrop={PaymentStatusDrop}
            statuses={paymentStatuses}
          />
        )}
        <div className="flex items-center gap-3 mt-9 mb-5">
          <motion.button
            whileHover={{ scale: 1.07 }}
            className="w-full px-4 py-2 text-blue-800 rounded-[9px] bg-white text-xl font-semibold"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full px-4 py-2 bg-blue-800 rounded-[9px] text-white text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleStatusEdit}
          >
            Save
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export const StatusComp = ({
  title,
  setStatusDrop,
  StatusDrop,
  setStatus,
  Status,
  statuses,
}) => {
  return (
    <div className="flex justify-between gap-2 mt-6 bg-white rounded-md px-4 py-2 pricing-shadow">
      <h3 className="text-base font-semibold mt-[6px]">{title}</h3>
      <div className="relative">
        <div className="bg-white grid items-center px-4 py-1 rounded-md overflow-hidden">
          <button
            className="flex items-center gap-2 text-base font-semibold"
            onClick={(e) => {
              e.preventDefault()
              setStatusDrop((prev) => !prev)
            }}
          >
            <StatusColor status={Status} className={'text-sm'} />{' '}
            <div
              className={`${
                StatusDrop ? 'rotate-[267deg]' : 'rotate-180 '
              } transition-all duration-300 ease-in-out absolute -right-2 top-2`}
            >
              <CloseMenuIcon size={'22'} color={'blue'} />
            </div>
          </button>
          <div
            className={`${
              StatusDrop ? 'max-h-[400px]' : 'max-h-0'
            } transition-all duration-300 ease-in-out`}
          >
            {statuses?.map((item, i) => (
              <div
                key={i}
                className={`border-zinc-300 border-t mt-3 pt-3 cursor-pointer`}
                onClick={() => setStatus(item?.title)}
              >
                <StatusColor status={item?.title} className={'text-sm'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditStatus
