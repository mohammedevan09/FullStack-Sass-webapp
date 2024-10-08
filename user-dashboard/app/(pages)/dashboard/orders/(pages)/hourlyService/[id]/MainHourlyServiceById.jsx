'use client'

import TakeAction from '../../../_components/TakeAction'
import OrderBasicInfo from '../../../_components/OrderBasicInfo'
import AdditionInfo from '../../../_components/AdditionInfo'
import ProjectTrackingBoard from '../../../_components/ProjectTrackingBoard'
import InboxAndMessaging from '../../../_components/InboxAndMessaging'
import BackButton from '@/components/others/BackButton'
import { useForm } from 'react-hook-form'
import { EditIcon } from '@/staticData/Icon'
import { useState } from 'react'
import EditOrderModal from '@/components/modals/orderModal/EditOrderModal'
import HourlyInfo from '../../../_components/HourlyInfo'
import HourlyTimeLogs from '../../../_components/HourlyTimeLogs'
import { updateOrderApi } from '@/api/orderApi'

const MainHourlyServiceById = ({ order, service, orderChat, messageCount }) => {
  const [orderData, setOrderData] = useState(order)
  const [editModal, setEditModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: orderData,
    mode: 'onChange',
  })

  return (
    <>
      <div className="sm:my-14 my-8">
        <BackButton
          link={'/dashboard/orders/hourlyService'}
          title={'Go back'}
        />
        <div className="md:flex grid md:justify-between xs:items-start items-end gap-6 mb-6">
          <OrderBasicInfo order={orderData} service={service} />
          <div className="flex gap-2 items-start">
            <button
              onClick={() => setEditModal(true)}
              className="flex justify-center min-w-[135px] items-center gap-2 text-base py-1 px-4 rounded-md font-semibold hover:scale-105 transition text-white bg-blue-500"
            >
              Edit Info <EditIcon color={'white'} />
            </button>
            <TakeAction
              order={orderData}
              orderChat={orderChat}
              setOrderData={setOrderData}
              link={`hourlyService/${order?._id}`}
            />
          </div>
        </div>

        <HourlyInfo order={orderData} />

        <AdditionInfo order={orderData} />

        <HourlyTimeLogs
          order={orderData}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          reset={reset}
          watch={watch}
          setOrderData={setOrderData}
        />

        <h1 className="text-2xl font-semibold pb-5 pt-10">
          Project Traction Board
        </h1>
        <ProjectTrackingBoard
          order={orderData}
          link={`hourlyService/${order?._id}`}
          api={updateOrderApi}
        />
        <h1 className="text-2xl font-semibold pt-10 pb-5">Inbox & Messaging</h1>
        <InboxAndMessaging
          to={'order'}
          itemData={orderData}
          chatData={orderChat}
          messageCount={messageCount}
        />
      </div>
      {editModal && (
        <EditOrderModal
          register={register}
          errors={errors}
          isDirty={isDirty}
          isValid={isValid}
          setOpenModal={setEditModal}
          openModal={editModal}
          fields={order?.formId?.fields}
          handleSubmit={handleSubmit}
          setOrderData={setOrderData}
          link={`hourlyService/${order?._id}`}
          reset={reset}
        />
      )}
    </>
  )
}

export default MainHourlyServiceById
