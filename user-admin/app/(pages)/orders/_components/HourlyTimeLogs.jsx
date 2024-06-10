'use client'

import { useState } from 'react'
import { EditIcon, RemoveIcon } from '@/staticData/Icon'
import CountdownClock from './CountDownClock'
import AddOrEditHourlyLogsModal from '@/components/modals/orderModal/AddOrEditHourlyLogsModal'
import toast from 'react-hot-toast'
import {
  createHourlyTimeLogsApi,
  updateHourlyTimeLogApi,
} from '@/api/hourlyTimeLogsApi'
import RemoveHourlyTimeLogsModal from '@/components/modals/orderModal/RemoveHourlyTimeLogsModal'
import TablePagination from '@/components/others/TablePagination'
import { useSelector } from 'react-redux'

const HourlyTimeLogs = ({
  order,
  register,
  errors,
  handleSubmit,
  reset,
  watch,
  setOrderData,
}) => {
  const { userInfo } = useSelector((state) => state?.user)

  const [OpenModal, setOpenModal] = useState(false)
  const [removeModal, setRemoveModal] = useState(false)
  const [logsLength, setLogsLength] = useState(order?.hourlyTimeLogs?.length)

  const handleClick = async (data) => {
    try {
      toast.loading('Processing, please wait!', { duration: 600 })
      if (logsLength === order?.hourlyTimeLogs?.length) {
        await createHourlyTimeLogsApi(
          data?.hourlyTimeLogs?.[logsLength],
          order?._id,
          userInfo?.token
        )
      } else {
        await updateHourlyTimeLogApi(
          data?.hourlyTimeLogs?.[logsLength],
          `${order?._id}/${data?.hourlyTimeLogs?.[logsLength]?._id}`,
          userInfo?.token
        )
      }
      toast.success('Hourly Time log updated!')
      window.location.reload()
    } catch (error) {
      toast.error('Sorry cannot update time logs!')
    }
  }

  return (
    <>
      <div className="mt-16 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Hourly Time logs</h1>
          <button
            className="px-4 py-1 hover:scale-105 transition-all duration-200 ease-in-out bg-[#3B82F6] rounded-md text-white font-semibold"
            onClick={(e) => {
              e.preventDefault()
              setLogsLength(order?.hourlyTimeLogs?.length)
              setOpenModal(true)
            }}
          >
            Create New +
          </button>
        </div>

        <div className="w-full bg-white rounded-[20.37px] pt-8 pb-4 mt-4 overflow-x-scroll">
          <div className="px-7">
            <table className="w-full">
              <thead>
                <tr className="lg:text-xl text-lg font-semibold tracking-tight text-left">
                  <th>#Tasks & Memo</th>
                  <th className="text-center">Time & Date</th>
                  <th className="text-center">Logged Hours</th>
                  <th className="text-center">Time remain</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {order?.hourlyTimeLogs?.length === 0 ? (
                <div className="py-4 font-bold italic text-lg text-[#00000047]">
                  No Hourly Time Log created
                </div>
              ) : (
                <tbody className="text-sm font-semibold text-zinc-700">
                  {order?.hourlyTimeLogs?.map((item, i) => {
                    const currentTime = new Date().getTime()
                    const startDate = new Date(
                      `${item?.date}T${item?.startTime}`
                    ).getTime()
                    const endDate = new Date(
                      `${item?.date}T${item?.endTime}`
                    ).getTime()
                    return (
                      <tr key={i}>
                        <td className="py-4 w-[300px]">
                          <div className="grid justify-start items-center gap-[2px] w-[300px]">
                            <div className="font-semibold">{item?.task}</div>
                            <div className="font-medium">{item?.memo}</div>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="grid gap-1 w-[180px] mx-auto justify-center items-center">
                            <div>{item?.date}</div>
                            <div className="text-xs">
                              {convertToAMPM(item?.startTime)} -{' '}
                              {convertToAMPM(item?.endTime)}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 text-center">
                          <div className="w-[150px] mx-auto">
                            {calculateTotalTime(item?.startTime, item?.endTime)}
                          </div>
                        </td>
                        <td className="py-4 text-center italic">
                          <div className="w-[150px] mx-auto">
                            {startDate > currentTime ? (
                              'Pending'
                            ) : (
                              <CountdownClock
                                startDate={startDate}
                                endDate={endDate}
                                currentTime={currentTime}
                              />
                            )}
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <div className="w-[90px] mx-auto flex gap-4 justify-center">
                            <button
                              className={`disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                              disabled={startDate > currentTime === false}
                              onClick={(e) => {
                                e.preventDefault()
                                setLogsLength(i)
                                setOpenModal(true)
                              }}
                            >
                              <EditIcon color={'#2525ff'} />
                            </button>
                            <button
                              className={`disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
                              disabled={startDate > currentTime === false}
                              onClick={(e) => {
                                e.preventDefault()
                                setLogsLength(i)
                                setRemoveModal(true)
                              }}
                            >
                              <RemoveIcon color={'#ff2a2a'} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              )}
            </table>
          </div>
          <TablePagination pageCount={order?.totalDocsCount} />
        </div>
      </div>
      {OpenModal && (
        <AddOrEditHourlyLogsModal
          openModal={OpenModal}
          setOpenModal={setOpenModal}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit(handleClick)}
          logsLength={logsLength}
          order={order}
          reset={reset}
          watch={watch}
        />
      )}
      {removeModal && (
        <RemoveHourlyTimeLogsModal
          reset={reset}
          setOrderData={setOrderData}
          setOpenModal={setRemoveModal}
          openModal={removeModal}
          handleSubmit={handleSubmit}
          order={order}
          logsLength={logsLength}
        />
      )}
    </>
  )
}

export const calculateTotalTime = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number)
  const [endHours, endMinutes] = endTime.split(':').map(Number)

  const totalStartMinutes = startHours * 60 + startMinutes
  const totalEndMinutes = endHours * 60 + endMinutes

  let totalTimeInMinutes = totalEndMinutes - totalStartMinutes

  if (totalTimeInMinutes < 0) {
    totalTimeInMinutes = 1440 - totalStartMinutes + totalEndMinutes
  }

  const hours = Math.floor(totalTimeInMinutes / 60)
  const remainingMinutes = totalTimeInMinutes % 60

  let formattedTime = ''

  if (hours > 0) {
    formattedTime += `${hours} hour`
    if (hours > 1) {
      formattedTime += 's'
    }
  }

  if (remainingMinutes > 0) {
    if (formattedTime !== '') {
      formattedTime += ' '
    }
    formattedTime += `${remainingMinutes} minute`
    if (remainingMinutes > 1) {
      formattedTime += 's'
    }
  }

  return formattedTime
}

export function convertToAMPM(time24) {
  let [hours, minutes] = time24.split(':')
  let meridiem = 'AM'

  if (hours >= 12) {
    meridiem = 'PM'
    hours -= 12
  }

  if (hours === 0) {
    hours = 12
  }

  return `${String(hours).padStart(2, '0')}:${minutes} ${meridiem}`
}

export default HourlyTimeLogs
