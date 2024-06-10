import dotenv from 'dotenv'
dotenv.config()

import Stripe from 'stripe'
import NormalServiceOrder from '../../model/orderModels/normalServiceOrderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import OrderChat from '../../model/orderModels/orderChatModel.js'
import { createNotification } from '../notificationController/notificationController.js'

const stripe = Stripe(process.env.SECURITY_KEY)

const clientURL = process.env.BASE_URL

export const createNormalServiceOrder = async (req, res, next) => {
  try {
    const populatedOrder = await NormalServiceOrder.create({
      ...req.body,
      userId: req.user?._id,
    }).then((order) =>
      NormalServiceOrder.findById(order._id)
        .populate({
          path: 'serviceId',
          model: 'Service',
          select: '_id name heading icon',
        })
        .exec()
    )

    if (populatedOrder?.payment_method_types !== 'card') {
      await createNotification({
        content: populatedOrder?.description,
        title: populatedOrder?.title,
        type: 'Order',
        to: 'project',
        id: populatedOrder?._id,
        userId: populatedOrder.userId,
      })
      return res.status(200).json(populatedOrder)
    }

    const customer = await stripe.customers.create({
      metadata: {
        orderId: populatedOrder._id.toString(),
      },
    })

    const line_items = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: populatedOrder?.serviceId?.name,
            description: populatedOrder?.serviceId?.heading,
            // images: [populatedOrder?.serviceId?.icon],
          },
          unit_amount: req.body?.totalAmount * 100,
        },
        quantity: 1,
      },
    ]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${clientURL}/dashboard/orders?userId=${req.user?._id}`,
      cancel_url: `${clientURL}/dashboard/services`,
    })

    await createNotification({
      content: populatedOrder?.description,
      title: populatedOrder?.title,
      type: 'Order',
      to: 'project',
      id: populatedOrder?._id,
      userId: populatedOrder.userId,
    })

    return res.status(200).json({ ...populatedOrder._doc, url: session?.url })
  } catch (error) {
    next(error)
  }
}

export const getNormalServiceOrderById = async (req, res, next) => {
  try {
    const order = await NormalServiceOrder.findById(req.params.id)
      .populate({
        path: 'formId',
        model: 'Form',
        select: 'fields',
      })
      .populate({
        path: 'serviceId',
        model: 'Service',
      })
      .exec()

    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}

export const deleteNormalServiceOrderById = async (req, res, next) => {
  try {
    const order = await NormalServiceOrder.findByIdAndDelete(req.params.id)

    await OrderChat.deleteOne({
      orderId: data?._id,
    })

    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}
