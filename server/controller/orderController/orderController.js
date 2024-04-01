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

export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find()

    console.log(orders)

    const categorizedOrders = orders.reduce((acc, curr) => {
      const { __t } = curr
      if (!acc[__t]) {
        acc[__t] = []
      }
      acc[__t].push(curr)
      return acc
    }, {})

    const formattedOrders = {
      Normal: categorizedOrders.NormalServiceOrder || [],
      Subscription: categorizedOrders.SubscriptionServiceOrder || [],
      Hourly: categorizedOrders.HourlyServiceOrder || [],
    }

    return sendResponse(res, formattedOrders)
  } catch (error) {
    next(error)
  }
}
