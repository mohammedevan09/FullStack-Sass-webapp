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

  console.log(`Received event type: ${eventType}`)

  // Handle the event
  if (eventType === 'checkout.session.completed') {
    console.log('Running checkout.session.completed handler')
    console.log('Data:', data)

    if (!data.customer) {
      console.error('No customer ID in the event data')
      return res
        .status(400)
        .json({ message: 'No customer ID in the event data' })
    }

    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log('Customer retrieved:', customer)
        createStripeOrder(customer, data, res)
      })
      .catch((err) => {
        console.error('Error retrieving customer:', err.message)
        res.status(500).send(`Error retrieving customer: ${err.message}`)
      })
  } else {
    res.status(400).send(`Unhandled event type ${eventType}`)
  }
}
