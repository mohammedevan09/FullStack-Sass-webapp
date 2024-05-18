import HourlyServiceOrder from '../../model/orderModels/hourlyServiceOrderModel.js'
import OrderChat from '../../model/orderModels/orderChatModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import mongoose from 'mongoose'
import {
  createNotification,
  updateNotification,
} from '../notificationController/notificationController.js'

export const createHourlyServiceOrder = async (req, res, next) => {
  try {
    const createOrder = await HourlyServiceOrder.create(req.body)

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

export const updateHourlyServiceOrderById = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const order = await HourlyServiceOrder.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
      .populate({
        path: 'formId',
        model: 'Form',
        select: 'fields',
      })
      .exec()

    if (!order) {
      return sendResponse(res, 'Hourly Service Order not found')
    }

    const reversedHourlyTimeLogs = order.hourlyTimeLogs.slice().reverse()

    const start = (parseInt(page) - 1) * parseInt(limit)
    const end = start + parseInt(limit)
    const hourlyTimeLogs = reversedHourlyTimeLogs.slice(start, end)

    const result = {
      ...order.toObject(),
      hourlyTimeLogs,
    }

    await updateNotification({
      content: order?.description,
      title: order?.title,
      type: 'Order',
      to: 'project',
      id: order?._id,
      userId: order.userId,
    })

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
    const hourlyServiceOrder = await HourlyServiceOrder.findById(orderId)

    if (!hourlyServiceOrder) {
      return res.status(404).json({ message: 'HourlyServiceOrder not found' })
    }

    hourlyServiceOrder.hourlyTimeLogs.push(req.body)

    await hourlyServiceOrder.save()

    return sendResponse(res, hourlyServiceOrder)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateHourlyTimeLog = async (req, res, next) => {
  const { orderId, logId } = req.params
  const { task, memo, date, startTime, endTime } = req.body

  try {
    const order = await HourlyServiceOrder.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const logToUpdate = order.hourlyTimeLogs.find(
      (log) => log._id.toString() === logId
    )

    if (!logToUpdate) {
      return res.status(404).json({ message: 'Hourly Time Log not found' })
    }

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

    await order.save()

    return sendResponse(res, order)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

export const removeHourlyTimeLog = async (req, res, next) => {
  const { orderId, logId } = req.params

  try {
    const order = await HourlyServiceOrder.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const logToRemoveIndex = order.hourlyTimeLogs.findIndex(
      (log) => log._id.toString() === logId
    )

    if (logToRemoveIndex === -1) {
      return res.status(404).json({ message: 'Hourly Time Log not found' })
    }

    order.hourlyTimeLogs.splice(logToRemoveIndex, 1)
    await order.save()

    return sendResponse(res, 'Hourly Time Log removed successfully')
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}
