import dotenv from 'dotenv'
dotenv.config()

import Stripe from 'stripe'
import NormalServiceOrder from '../../model/orderModels/normalServiceOrderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import OrderChat from '../../model/orderModels/orderChatModel.js'
import { createNotification } from '../notificationController/notificationController.js'

const stripe = Stripe(process.env.SECURITY_KEY)

const clientURL = process.env.CLIENT_URL

export const createNormalServiceOrder = async (req, res, next) => {
  try {
    const createOrder = await NormalServiceOrder.create({
      ...req.body,
      userId: req.user?._id,
    })

    if (createOrder?.payment_method_types === 'card') {
      const customer = await stripe.customers.create({
        metadata: {
          orderId: createOrder?._id.toString(),
        },
      })

      const line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: req.body?.title,
              images: [
                'https://i.postimg.cc/NfPBTwRn/Pngtree-contact-our-male-customer-service-5412873.png',
              ],
            },
            unit_amount: req.body?.amount * 100,
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
        success_url: `${clientURL}/dashboard/services/designAndDevelopmentPackages`,
        cancel_url: `${clientURL}/`,
      })

      return res.send({ url: session?.url })
    } else {
      await createNotification({
        content: createOrder?.description,
        title: createOrder?.title,
        type: 'Order',
        to: 'project',
        id: createOrder?._id,
        userId: createOrder.userId,
      })
      return res.status(200).json(createOrder)
    }
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
