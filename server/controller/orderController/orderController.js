import mongoose, { Types } from 'mongoose'
import Order from '../../model/orderModels/orderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createStripeOrder = async (customer, data, res) => {
  // console.log(customer, data)
  try {
    const updateOrder = await Order?.findByIdAndUpdate(
      { _id: customer?.metadata?.orderId },
      {
        customerId: customer?.id,
        payment_intent: data?.payment_intent,
        payment_status: data?.payment_status,
        payment_method_types: data?.payment_method_types[0],
        additionalInfo: {
          phone: data?.customer_details?.phone,
        },
        status: 'running',
      },
      { new: true }
    )

    if (!updateOrder) {
      return res.status(404).json({ message: 'Order not found!' })
    }

    return res.status(201).json({ message: 'Order completed' })
  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
}

export const getAllOrder = async (req, res, next) => {
  try {
    let query = {}

    if (req.query.__t) {
      query.__t = req.query.__t
    }
    if (
      req.query.userId &&
      (req.query.role === 'user' || req.query.role === 'userMember')
    ) {
      query.userId = new mongoose.Types.ObjectId(req.query.userId)
    }

    const accessOf = req.query?.access?.orders?.accessOf || []

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit
    const { search = '' } = req.query

    const pipeline = [
      {
        $match: {
          ...query,
          $or: [
            { title: { $regex: new RegExp(search), $options: 'i' } },
            {
              _id: Types.ObjectId.isValid(search)
                ? new Types.ObjectId(search)
                : null,
            },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
    ]

    if (req.query.access) {
      pipeline.push({ $match: { _id: { $in: accessOf } } })
    }

    pipeline.push(
      { $group: { _id: '$__t', orders: { $push: '$$ROOT' } } },
      {
        $project: {
          _id: 0,
          serviceType: '$_id',
          orders: {
            $slice: ['$orders', skip, limit],
          },
        },
      }
    )

    const orders = await Order.aggregate(pipeline)

    const formattedOrders = orders.reduce((acc, curr) => {
      acc[curr.serviceType] = curr.orders.length > 0 ? curr.orders : []
      return acc
    }, {})

    return sendResponse(res, formattedOrders)
  } catch (error) {
    next(error)
  }
}
