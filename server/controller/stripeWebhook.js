import dotenv from 'dotenv'
dotenv.config()

import Stripe from 'stripe'
import { createStripeOrder } from './orderController/orderController.js'
import Order from '../model/orderModels/orderModel.js'
import { createNotification } from './notificationController/notificationController.js'
import { generateCustomDate } from '../utils/generateDate.js'

export const stripe = Stripe(process.env.SECURITY_KEY)

export const stripeWebhook = async (req, res, next) => {
  try {
    const endpointSecret = process.env.ENDPOINT_SECRET

    const sig = req.headers['stripe-signature']

    let data
    let eventType
    const customDate = generateCustomDate()

    if (endpointSecret) {
      let event

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
      } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`)
      }

      data = event.data.object
      eventType = event.type
    } else {
      data = req.body.data.object
      eventType = req.body.type
    }

    // Handle the event
    if (
      eventType === 'checkout.session.completed' &&
      data?.mode === 'payment'
    ) {
      if (!data.customer) {
        return res
          .status(400)
          .json({ message: 'No customer ID in the event data' })
      }

      if (data?.mode !== 'subscription') {
        stripe.customers
          .retrieve(data.customer)
          .then((customer) => {
            createStripeOrder(customer, data, res)
          })
          .catch((err) => {
            res.status(500).send(`Error retrieving customer: ${err.message}`)
          })
      }
    } else if (eventType === 'invoice.payment_succeeded') {
      const subscription = await stripe.subscriptions.retrieve(
        data.subscription
      )
      const customer = await stripe.customers.retrieve(data.customer)

      const order = await Order.findById(customer?.metadata?.orderId)

      if (data.billing_reason === 'subscription_create') {
        order.additionalInfo = {
          ...order.additionalInfo,
          'Payment Phone': data?.customer_phone,
        }
        order.payment_info = {
          subscriptionId: subscription?.id,
          customerId: subscription?.customer,
        }

        order.payment_status = data?.status
        order.payment_method_types = 'card'
        order.status = 'running'
        order.startTime = new Date(subscription?.current_period_start * 1000)
        order.endTime = new Date(subscription?.current_period_end * 1000)

        order.events = [
          {
            eventType: 'created',
            eventDate: new Date(subscription?.current_period_start * 1000),
          },
        ]

        await order.save()

        await createNotification({
          content: order?.description,
          title: order?.title,
          type: 'Order',
          to: 'subscription',
          id: order?._id,
          userId: order.userId,
        })

        return res.status(201).json({ message: 'Order completed successfully' })
      } else if (
        data.billing_reason === 'subscription_cycle' ||
        data.billing_reason === 'subscription_update'
      ) {
        order.startTime = new Date(subscription?.current_period_start * 1000)
        order.endTime = new Date(subscription?.current_period_end * 1000)

        order.events = order?.events?.find(
          (item) => item?.eventType === 'updated'
        )
          ? order.events.map((event) =>
              event.eventType === 'updated'
                ? {
                    eventType: 'updated',
                    eventDate: customDate,
                  }
                : event
            )
          : [
              ...order.events,
              {
                eventType: 'updated',
                eventDate: customDate,
              },
            ]

        await order.save()

        await createNotification({
          content: order?.description,
          title: order?.title,
          type: 'Order',
          to: 'subscription',
          id: order?._id,
          userId: order.userId,
        })

        return res.status(201).json({ message: 'Order completed successfully' })
      }
    } else if (eventType === 'customer.subscription.updated') {
      const customer = await stripe.customers.retrieve(data.customer)

      const order = await Order.findById(customer?.metadata?.orderId)

      if (data.cancel_at_period_end) {
        order.status = 'canceled'
        order.startTime = new Date(data?.current_period_start * 1000)
        order.endTime = new Date(data?.current_period_end * 1000)

        order.events = order?.events?.find(
          (item) => item?.eventType === 'canceled'
        )
          ? order.events.map((event) =>
              event.eventType === 'canceled'
                ? {
                    eventType: 'canceled',
                    eventDate: customDate,
                  }
                : event
            )
          : [
              ...order.events,
              {
                eventType: 'canceled',
                eventDate: customDate,
              },
            ]

        await order.save()

        return res.status(201).json({ message: 'Order deleted successfully' })
      } else {
        order.status = 'running'
        order.startTime = new Date(data?.current_period_start * 1000)
        order.endTime = new Date(data?.current_period_end * 1000)

        order.events = order?.events?.find(
          (item) => item?.eventType === 'renewed'
        )
          ? order.events.map((event) =>
              event.eventType === 'renewed'
                ? {
                    eventType: 'renewed',
                    eventDate: customDate,
                  }
                : event
            )
          : [
              ...order.events,
              {
                eventType: 'renewed',
                eventDate: customDate,
              },
            ]
        await order.save()

        return res.status(201).json({ message: 'Order completed successfully' })
      }
    } else {
      return
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}
