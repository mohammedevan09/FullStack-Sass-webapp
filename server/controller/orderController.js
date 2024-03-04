import dotenv from 'dotenv'
dotenv.config()

import Stripe from 'stripe'
import WebsiteDesignAndDev from '../model/serviceModels/websiteDesignAndDevModal.js'
import Order from '../model/orderModal.js'

const stripe = Stripe(
  'sk_test_51O1iu1Hh9TFIH4ulMplylfg61wJSrO95aMroqomPhJmV0gE3fad1ZTspFI95GXP6C6apj0wpkStKeNW9rqGELi7j00zmxx1TFe'
)

const clientURL = process.env.CLIENT_URL

export const createWebsiteDesignAndDev = async (req, res) => {
  const createOrder = await WebsiteDesignAndDev.create({
    ...req.body,
    payment_status: 'pending',
    status: 'pending',
  })

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

  res.send({ url: session?.url })
}

const createOrder = async (customer, data, res) => {
  try {
    const updateOrder = await Order?.findByIdAndUpdate(
      { _id: customer?.metadata?.orderId },
      {
        payment_intent: data?.payment_intent,
        payment_status: data?.payment_status,
        payment_method_types: data?.payment_method_types[0],
        phone: data?.customer_details?.phone,
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
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data, res)
      })
      .catch((err) => console.log(err.message))
  }
}
