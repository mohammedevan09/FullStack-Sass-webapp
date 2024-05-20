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
    const {
      __t,
      status,
      userId,
      role,
      access,
      page = 1,
      limit = 5,
      search = '',
    } = req.query

    const query = {
      ...(__t && { __t }),
      ...(status && { status }),
      ...(userId &&
        (role === 'user' || role === 'userMember') && {
          userId: new Types.ObjectId(userId),
        }),
    }

    const accessOf = access?.orders?.accessOf || []
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const matchStage = {
      $match: {
        ...query,
        $or: [
          { title: { $regex: new RegExp(search, 'i') } },
          {
            _id: Types.ObjectId.isValid(search)
              ? new Types.ObjectId(search)
              : null,
          },
        ],
      },
    }

    if (access) {
      matchStage.$match._id = { $in: accessOf }
    }

    const pipeline = [
      matchStage,
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$__t',
          orders: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 0,
          serviceType: '$_id',
          orders: { $slice: ['$orders', skip, parseInt(limit)] },
        },
      },
    ]

    const [orders, totalCount] = await Promise.all([
      Order.aggregate(pipeline),
      Order.countDocuments(matchStage.$match),
    ])

    const formattedOrders = orders.reduce((acc, curr) => {
      acc[curr.serviceType] = curr.orders.length > 0 ? curr.orders : []
      return acc
    }, {})

    const response = {
      orders: formattedOrders,
      totalDocsCount: totalCount,
    }

    return sendResponse(res, response)
  } catch (error) {
    next(error)
  }
}
