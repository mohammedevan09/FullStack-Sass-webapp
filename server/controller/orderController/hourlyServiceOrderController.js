import HourlyServiceOrder from '../../model/orderModels/hourlyServiceOrderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import mongoose from 'mongoose'

export const createHourlyServiceOrder = async (req, res, next) => {
  try {
    const createOrder = await HourlyServiceOrder.create(req.body)

    return res.status(200).json(createOrder)
  } catch (error) {
    next(error)
  }
}

export const getHourlyServiceOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { page = 1, limit = 10 } = req.query

    // const order = await HourlyServiceOrder.aggregate([
    //   {
    //     $match: { _id: new mongoose.Types.ObjectId(id) },
    //   },
    //   {
    //     $lookup: {
    //       from: 'forms',
    //       localField: 'formId',
    //       foreignField: '_id',
    //       as: 'form',
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: '$hourlyTimeLogs',
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $sort: { 'hourlyTimeLogs._id': 1 },
    //   },
    //   {
    //     $group: {
    //       _id: '$_id',
    //       projectTrackingBoard: { $first: '$projectTrackingBoard' },
    //       additionalInfo: { $first: '$additionalInfo' },
    //       totalHours: { $first: '$totalHours' },
    //       spentHours: { $first: '$spentHours' },
    //       remainHours: { $first: '$remainHours' },
    //       userId: { $first: '$userId' },
    //       serviceId: { $first: '$serviceId' },
    //       title: { $first: '$title' },
    //       description: { $first: '$description' },
    //       totalAmount: { $first: '$totalAmount' },
    //       pricingId: { $first: '$pricingId' },
    //       formId: { $first: { $arrayElemAt: ['$form', 0] } },
    //       createdAt: { $first: '$createdAt' },
    //       updatedAt: { $first: '$updatedAt' },
    //       payment_method_types: { $first: '$payment_method_types' },
    //       payment_status: { $first: '$payment_status' },
    //       payment_info: { $first: '$payment_info' },
    //       status: { $first: '$status' },
    //       __t: { $first: '$__t' },
    //       hourlyTimeLogs: { $push: '$hourlyTimeLogs' },
    //     },
    //   },
    //   {
    //     $project: {
    //       projectTrackingBoard: 1,
    //       additionalInfo: 1,
    //       totalHours: 1,
    //       spentHours: 1,
    //       remainHours: 1,
    //       userId: 1,
    //       serviceId: 1,
    //       title: 1,
    //       description: 1,
    //       totalAmount: 1,
    //       pricingId: 1,
    //       createdAt: 1,
    //       updatedAt: 1,
    //       payment_method_types: 1,
    //       payment_status: 1,
    //       payment_info: 1,
    //       status: 1,
    //       __t: 1,
    //       formId: {
    //         _id: '$formId._id',
    //         fields: '$formId.fields',
    //       },
    //       hourlyTimeLogs: {
    //         $slice: [
    //           {
    //             $map: {
    //               input: {
    //                 $slice: [
    //                   '$hourlyTimeLogs',
    //                   0,
    //                   { $size: '$hourlyTimeLogs' },
    //                 ],
    //               },
    //               in: {
    //                 $mergeObjects: ['$$this', {}],
    //               },
    //             },
    //           },
    //           (parseInt(page) - 1) * parseInt(limit),
    //           parseInt(limit),
    //         ],
    //       },
    //     },
    //   },
    // ])

    // if (!order || order.length === 0) {
    //   return sendResponse(res, 'Hourly Service Order not found')
    // }

    // return sendResponse(res, order[0])

    const order = await HourlyServiceOrder.findById(id)
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

    return sendResponse(res, result)
  } catch (error) {
    next(error)
  }
}

export const deleteHourlyServiceOrderById = async (req, res, next) => {
  try {
    const order = await HourlyServiceOrder.findByIdAndDelete(req.params.id)

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
