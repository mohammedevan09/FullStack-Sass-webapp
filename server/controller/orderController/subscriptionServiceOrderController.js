import dotenv from 'dotenv'
dotenv.config()

import Stripe from 'stripe'
import OrderChat from '../../model/orderModels/orderChatModel.js'
import SubscriptionServiceOrder from '../../model/orderModels/subscriptionServiceOrderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import { createNotification } from '../notificationController/notificationController.js'

const stripe = Stripe(process.env.SECURITY_KEY)

const clientURL = process.env.BASE_URL

export const createSubscriptionServiceOrder = async (req, res, next) => {
  try {
    const order = await SubscriptionServiceOrder.create({
      ...req.body,
      userId: req.user?._id,
    })
    const populatedOrder = await SubscriptionServiceOrder.findOne(order._id)
      .populate({
        path: 'serviceId',
        model: 'Service',
        select: '_id name heading icon',
      })
      .exec()

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
          },
          unit_amount: req.body?.totalAmount * 100,
          recurring: {
            interval: 'month',
          },
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
      mode: 'subscription',
      billing_address_collection: 'auto',
      metadata: {
        orderId: populatedOrder._id.toString(),
      },
      success_url: `${clientURL}/dashboard/orders?userId=${req.user?._id}`,
      cancel_url: `${clientURL}/dashboard/services`,
    })

    populatedOrder.payment_info = {
      customerId: customer?.id,
    }

    await populatedOrder.save()

    return res.status(200).json({ ...populatedOrder._doc, url: session?.url })
  } catch (error) {
    next(error)
  }
}

export const renewOrCancelStripeSubscription = async (req, res, next) => {
  try {
    const order = await SubscriptionServiceOrder.findById(req.params.id)
      .populate({
        path: 'serviceId',
        model: 'Service',
        select: '_id name heading icon',
      })
      .exec()

    const existingCustomer = await stripe.customers.retrieve(
      order?.payment_info?.customerId
    )

    if (order?.payment_info?.subscriptionId) {
      const session = await stripe.billingPortal.sessions.create({
        customer: existingCustomer.id,
        return_url: `${clientURL}/dashboard/orders?userId=${req.user?._id}`,
      })
      return res.status(201).json({ url: session.url })
    } else {
      const line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: order?.serviceId?.name,
              description: order?.serviceId?.heading,
            },
            unit_amount: order?.totalAmount * 100,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ]
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        phone_number_collection: {
          enabled: true,
        },
        customer: existingCustomer.id,
        line_items,
        mode: 'subscription',
        billing_address_collection: 'auto',
        metadata: {
          orderId: order._id.toString(),
        },
        success_url: `${clientURL}/dashboard/orders?userId=${req.user?._id}`,
        cancel_url: `${clientURL}/dashboard/services`,
      })

      await createNotification({
        content: order?.description,
        title: order?.title,
        type: 'Order',
        to: 'subscription',
        id: order?._id,
        userId: order.userId,
      })

      return res.status(200).json({ ...order._doc, url: session?.url })
    }
  } catch (error) {
    next(error)
  }
}

export const getSubscriptionServiceOrderById = async (req, res, next) => {
  try {
    const order = await SubscriptionServiceOrder.findById({
      _id: req.params.id,
    })
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

    if (order.startTime && order.endTime) {
      const startTime = order.startTime
      const endTime = order.endTime
      const durationInMilliseconds = endTime.getTime() - startTime.getTime()
      const durationInDays = durationInMilliseconds / (1000 * 3600 * 24)

      return sendResponse(res, {
        ...order?._doc,
        duration: {
          days: durationInDays || 0,
        },
      })
    } else {
      return sendResponse(res, order)
    }
  } catch (error) {
    next(error)
  }
}

export const deleteSubscriptionServiceOrderById = async (req, res, next) => {
  try {
    const order = await SubscriptionServiceOrder.findByIdAndDelete(
      req.params.id
    )

    await OrderChat.deleteOne({
      orderId: data?._id,
    })

    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}
