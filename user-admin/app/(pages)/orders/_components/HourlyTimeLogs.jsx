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
import { updateOrderApi } from '@/api/orderApi'
import RemoveHourlyTimeLogsModal from '@/components/modals/orderModal/RemoveHourlyTimeLogsModal'

const HourlyTimeLogs = ({
  order,
  register,
  errors,
  handleSubmit,
  reset,
  watch,
  setOrderData,
}) => {
  const [OpenModal, setOpenModal] = useState(false)
  const [removeModal, setRemoveModal] = useState(false)
  const [logsLength, setLogsLength] = useState(order?.hourlyTimeLogs?.length)

  const handleClick = async (data) => {
    try {
      let totalTimeString = calculateTotalTime(
        data?.hourlyTimeLogs?.[logsLength]?.startTime,
        data?.hourlyTimeLogs?.[logsLength]?.endTime
      )

      if (logsLength === order?.hourlyTimeLogs?.length) {
        await createHourlyTimeLogsApi(
          data?.hourlyTimeLogs?.[logsLength],
          order?._id
        )

        const updated = await updateOrderApi(
          {
            remainHours: subtractTime(order?.remainHours, totalTimeString),
            spentHours: addTime(order?.spentHours, totalTimeString),
          },
          `hourlyService/${order?._id}`
        )

        setOrderData(updated)
      } else {
        await updateHourlyTimeLogApi(
          data?.hourlyTimeLogs?.[logsLength],
          `${order?._id}/${data?.hourlyTimeLogs?.[logsLength]?._id}`
        )

        order.remainHours = addTime(
          order?.remainHours,
          calculateTotalTime(
            order?.hourlyTimeLogs?.[logsLength]?.startTime,
            order?.hourlyTimeLogs?.[logsLength]?.endTime
          )
        )
        order.spentHours = subtractTime(
          order?.spentHours,
          calculateTotalTime(
            order?.hourlyTimeLogs?.[logsLength]?.startTime,
            order?.hourlyTimeLogs?.[logsLength]?.endTime
          )
        )

        const updated = await updateOrderApi(
          {
            remainHours: subtractTime(order?.remainHours, totalTimeString),
            spentHours: addTime(order?.spentHours, totalTimeString),
          },
          `hourlyService/${order?._id}`
        )
        setOrderData(updated)
      }
      reset()
      setOpenModal(false)
      toast.success('Hourly Time log updated!')
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

        <div className="w-full bg-white rounded-[20.37px] px-7 pt-8 mt-4 overflow-x-scroll">
          <table className="w-full">
            <thead>
              <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
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
              <tbody className="text-sm font-semibold text-zinc-600">
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
                          <div className="text-base font-semibold">
                            {item?.task}
                          </div>
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

export function subtractTime(time1, time2) {
  const getTimeInMinutes = (time) => {
    const parts = time
      .split(' ')
      .filter((part) => !isNaN(parseInt(part)))
      .map(Number)
    if (parts.length === 1) {
      return parts[0] * 60
    } else {
      const [hours, minutes] = parts
      return hours * 60 + minutes
    }
  }

  const totalMinutes1 = getTimeInMinutes(time1)
  const totalMinutes2 = getTimeInMinutes(time2)

  const differenceMinutes = totalMinutes1 - totalMinutes2

  const hours = Math.floor(differenceMinutes / 60)
  const minutes = differenceMinutes % 60

  return `${hours} hours ${minutes} minutes`
}

export function addTime(time1, time2) {
  const getTimeInMinutes = (time) => {
    const parts = time
      .split(' ')
      .filter((part) => !isNaN(parseInt(part)))
      .map(Number)
    if (parts.length === 1) {
      return parts[0] * 60 // Convert hours to minutes
    } else {
      const [hours, minutes] = parts
      return hours * 60 + minutes
    }
  }

  const totalMinutes1 = getTimeInMinutes(time1)
  const totalMinutes2 = getTimeInMinutes(time2)

  const sumMinutes = totalMinutes1 + totalMinutes2

  const hours = Math.floor(sumMinutes / 60)
  const minutes = sumMinutes % 60

  return `${hours} hours ${minutes} minutes`
}

export default HourlyTimeLogs
