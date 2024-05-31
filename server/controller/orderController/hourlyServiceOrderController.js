import HourlyServiceOrder from '../../model/orderModels/hourlyServiceOrderModel.js'
import OrderChat from '../../model/orderModels/orderChatModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import mongoose from 'mongoose'
import { createNotification } from '../notificationController/notificationController.js'

export const createHourlyServiceOrder = async (req, res, next) => {
  try {
    const createOrder = await HourlyServiceOrder.create({
      ...req.body,
      userId: req.user?._id,
    })

    await createNotification({
      content: createOrder?.description,
      title: createOrder?.title,
      type: 'Order',
      to: 'project',
      id: createOrder?._id,
      userId: createOrder.userId,
    })

    return res.status(200).json(createOrder)
  } catch (error) {
    next(error)
  }
}

export const getHourlyServiceOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { page = 1, limit = 10 } = req.query
    const start = (parseInt(page) - 1) * parseInt(limit)
    const end = start + parseInt(limit)

    const order = await HourlyServiceOrder.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'forms',
          localField: 'formId',
          foreignField: '_id',
          as: 'form',
        },
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceId',
          foreignField: '_id',
          as: 'service',
        },
      },
      {
        $addFields: {
          hourlyTimeLogs: {
            $reverseArray: '$hourlyTimeLogs',
          },
          totalDocsCount: { $size: '$hourlyTimeLogs' },
        },
      },
      {
        $project: {
          formId: {
            $cond: [
              { $isArray: ['$form'] },
              {
                $let: {
                  vars: {
                    formObj: { $arrayElemAt: ['$form', 0] },
                  },
                  in: {
                    _id: '$$formObj._id',
                    fields: '$$formObj.fields',
                  },
                },
              },
              null,
            ],
          },
          serviceId: { $arrayElemAt: ['$service', 0] },
          hourlyTimeLogs: { $slice: ['$hourlyTimeLogs', start, end] },
          totalDocsCount: '$totalDocsCount',
          ...Object.keys(HourlyServiceOrder.schema.paths).reduce(
            (acc, curr) => {
              if (
                curr !== '_id' &&
                curr !== '__v' &&
                curr !== 'formId' &&
                curr !== 'serviceId' &&
                curr !== 'hourlyTimeLogs'
              ) {
                acc[curr] = '$$ROOT.' + curr
              }
              return acc
            },
            {}
          ),
        },
      },
      {
        $addFields: {
          formId: '$formId',
          serviceId: '$serviceId',
        },
      },
    ])

    const result = order[0]
    return sendResponse(res, result)
  } catch (error) {
    next(error)
  }
}

export const deleteHourlyServiceOrderById = async (req, res, next) => {
  try {
    const order = await HourlyServiceOrder.findByIdAndDelete(req.params.id)

    await OrderChat.deleteOne({
      orderId: data?._id,
    })

    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}

export const addHourlyTimeLogs = async (req, res, next) => {
  const { orderId } = req.params

  try {
    const order = await HourlyServiceOrder.findById(orderId).populate({
      path: 'serviceId',
      model: 'Service',
      select: 'creatorId',
    })

    if (!order) {
      return res.status(404).json({ message: 'order not found' })
    }

    if (
      order.userId.toString() === req.user._id.toString() ||
      (order.userId.toString() === req.user.creatorId?.toString() &&
        req.user?.access?.orders?.accessOf.includes(order?._id)) ||
      order.serviceId?.creatorId.toString() === req.user._id.toString() ||
      (order.serviceId?.creatorId.toString() ===
        req.user.creatorId?.toString() &&
        req.user?.access?.orders?.accessOf.includes(order?._id))
    ) {
      let totalTimeString = calculateTotalTime(
        req.body?.startTime,
        req.body?.endTime
      )

      order.remainHours = subtractTime(order?.remainHours, totalTimeString)
      order.spentHours = addTime(order?.spentHours, totalTimeString)
      order.hourlyTimeLogs.push(req.body)

      await order.save()

      return sendResponse(res, { message: 'New Hourly time log added' })
    } else {
      return res.status(403).json({ message: 'You are not permitted' })
    }
  } catch (error) {
    next(error)
  }
}

export const updateHourlyTimeLog = async (req, res, next) => {
  const { orderId, logId } = req.params
  const { task, memo, date, startTime, endTime } = req.body

  try {
    const order = await HourlyServiceOrder.findById(orderId).populate({
      path: 'serviceId',
      model: 'Service',
      select: 'creatorId',
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    let totalTimeString = calculateTotalTime(startTime, endTime)

    if (
      order.userId.toString() === req.user._id.toString() ||
      (order.userId.toString() === req.user.creatorId?.toString() &&
        req.user?.access?.orders?.accessOf.includes(order?._id)) ||
      order.serviceId?.creatorId.toString() === req.user._id.toString() ||
      (order.serviceId?.creatorId.toString() ===
        req.user.creatorId?.toString() &&
        req.user?.access?.orders?.accessOf.includes(order?._id))
    ) {
      const logToUpdate = order.hourlyTimeLogs.find(
        (log) => log._id.toString() === logId
      )

      if (!logToUpdate) {
        return res.status(404).json({ message: 'Hourly Time Log not found' })
      }

      order.remainHours = addTime(
        order?.remainHours,
        calculateTotalTime(logToUpdate?.startTime, logToUpdate?.endTime)
      )
      order.spentHours = subtractTime(
        order?.spentHours,
        calculateTotalTime(logToUpdate?.startTime, logToUpdate?.endTime)
      )

      if (task) {
        logToUpdate.task = task
      }
      if (memo) {
        logToUpdate.memo = memo
      }
      if (date) {
        logToUpdate.date = date
      }
      if (startTime) {
        logToUpdate.startTime = startTime
      }
      if (endTime) {
        logToUpdate.endTime = endTime
      }

      order.remainHours = subtractTime(order?.remainHours, totalTimeString)
      order.spentHours = addTime(order?.spentHours, totalTimeString)

      await order.save()

      return sendResponse(res, { message: 'New Hourly time log updated' })
    } else {
      return res.status(403).json({ message: 'You are not permitted' })
    }
  } catch (error) {
    next(error)
  }
}

export const removeHourlyTimeLog = async (req, res, next) => {
  const { orderId, logId } = req.params

  try {
    const order = await HourlyServiceOrder.findById(orderId).populate({
      path: 'serviceId',
      model: 'Service',
      select: 'creatorId',
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if (
      order.userId.toString() === req.user._id.toString() ||
      (order.userId.toString() === req.user.creatorId?.toString() &&
        req.user?.access?.orders?.accessOf.includes(order?._id)) ||
      order.serviceId?.creatorId.toString() === req.user._id.toString() ||
      (order.serviceId?.creatorId.toString() ===
        req.user.creatorId?.toString() &&
        req.user?.access?.orders?.accessOf.includes(order?._id))
    ) {
      let totalTimeString = calculateTotalTime(
        req.body?.startTime,
        req.body?.endTime
      )

      const logToRemoveIndex = order.hourlyTimeLogs.findIndex(
        (log) => log._id.toString() === logId
      )

      if (logToRemoveIndex === -1) {
        return res.status(404).json({ message: 'Hourly Time Log not found' })
      }

      order.remainHours = addTime(order?.remainHours, totalTimeString)
      order.spentHours = subtractTime(order?.spentHours, totalTimeString)
      order.hourlyTimeLogs.splice(logToRemoveIndex, 1)
      await order.save()

      return sendResponse(res, {
        message: 'Hourly Time Log removed successfully',
      })
    } else {
      return res.status(403).json({ message: 'You are not permitted' })
    }
  } catch (error) {
    next(error)
  }
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

export const getTimeInMinutes = (time) => {
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

export function subtractTime(time1, time2) {
  const totalMinutes1 = getTimeInMinutes(time1)
  const totalMinutes2 = getTimeInMinutes(time2)

  const differenceMinutes = totalMinutes1 - totalMinutes2

  const hours = Math.floor(differenceMinutes / 60)
  const minutes = differenceMinutes % 60

  return `${hours} hours ${minutes} minutes`
}

export function addTime(time1, time2) {
  const totalMinutes1 = getTimeInMinutes(time1)
  const totalMinutes2 = getTimeInMinutes(time2)

  const sumMinutes = totalMinutes1 + totalMinutes2

  const hours = Math.floor(sumMinutes / 60)
  const minutes = sumMinutes % 60

  return `${hours} hours ${minutes} minutes`
}
