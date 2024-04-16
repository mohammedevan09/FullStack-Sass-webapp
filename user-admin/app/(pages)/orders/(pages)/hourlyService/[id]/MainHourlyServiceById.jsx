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

const MainHourlyServiceById = ({ order, service, orderChat, messageCount }) => {
  const [orderData, setOrderData] = useState(order)
  const [editModal, setEditModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    reset,
  } = useForm({
    defaultValues: orderData,
    mode: 'onChange',
  })

  const hourlyTimeLogs = [
    {
      title: 'Theme customization of beldo Co',
      description:
        'We’ve done all the customization of th  project in just 1 hour.',
      date: '02/01/203',
      times: '10AM-11AM',
      loggedHours: '1 Hour',
      loggedMinutes: '00 Minute',
    },
    {
      title: 'Theme customization of beldo Co',
      description:
        'We’ve done all the customization of th  project in just 1 hour.',
      date: '02/01/203',
      times: '10AM-11AM',
      loggedHours: '1 Hour',
      loggedMinutes: '00 Minute',
    },
    {
      title: 'Theme customization of beldo Co',
      description:
        'We’ve done all the customization of th  project in just 1 hour.',
      date: '02/01/203',
      times: '10AM-11AM',
      loggedHours: '1 Hour',
      loggedMinutes: '00 Minute',
    },
  ]

  return (
    <>
      <div className="sm:my-14 my-8">
        <BackButton link={'/orders/hourlyService'} title={'Go back'} />
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
              setValue={setValue}
              setOrderData={setOrderData}
              link={`hourlyService/${order?._id}`}
            />
          </div>
        </div>

        <HourlyInfo order={orderData} />

        <AdditionInfo order={orderData} />

        <div className="mt-8">
          <h1 className="text-2xl font-semibold">Hourly Time logs</h1>

          <div className="w-full bg-white rounded-[20.37px] px-7 py-8 mt-4 overflow-x-scroll">
            <table className="w-full">
              <thead>
                <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
                  <th>#Tasks & Memo</th>
                  <th className="text-center">Time & Date</th>
                  <th className="text-center">Logged Hours</th>
                </tr>
              </thead>

              <tbody className="lg:text-base text-sm font-medium">
                {hourlyTimeLogs?.map((item, i) => (
                  <tr key={i}>
                    <td className="py-4 w-[400px]">
                      <div className="grid justify-start items-center gap-1 w-[400px]">
                        <div className="text-lg font-medium">{item?.title}</div>
                        <div>{item?.description}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="w-[150px] grid justify-center items-center gap-2 mx-auto">
                        <div className="mx-auto">{item?.date}</div>
                        <div className="mx-auto">{item?.times}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="w-[150px] grid justify-center items-center gap-2 mx-auto">
                        <div className="mx-auto">{item?.loggedHours}</div>
                        <div className="mx-auto">{item?.loggedMinutes}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h1 className="text-2xl font-semibold pb-5 pt-10">
          Project Traction Board
        </h1>
        <ProjectTrackingBoard
          order={orderData}
          link={`hourlyService/${order?._id}`}
        />
        <h1 className="text-2xl font-semibold pt-10 pb-5">Inbox & Messaging</h1>
        <InboxAndMessaging
          order={orderData}
          orderChat={orderChat}
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
