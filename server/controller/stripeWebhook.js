import dotenv from 'dotenv'
dotenv.config()

import Stripe from 'stripe'
import { createStripeOrder } from './orderController/orderController.js'

const stripe = Stripe(process.env.SECURITY_KEY)

export const stripeWebhook = (req, res) => {
  const endpointSecret = process.env.ENDPOINT_SECRET

  const sig = req.headers['stripe-signature']

  let data
  let eventType

  if (endpointSecret) {
    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
      // console.log('Webhook verified', event)
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    data = event.data.object
    eventType = event.type
  } else {
    data = req.body.data.object
    eventType = req.body.type
  }

  // Handle the event
  if (eventType === 'checkout.session.completed') {
    console.log('running')
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        // console.log('customer', customer, 'Data', data)
        createStripeOrder(customer, data, res)
      })
      .catch((err) => console.log(err.message))
  }
}
