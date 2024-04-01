import { sendResponse } from './sendResponse.js'

export default function sendOneOrderResponse(res, order) {
  if (!order || !order.serviceId) {
    return res.status(404).json({ message: 'Order not found' })
  }

  const updatedPricing = order.serviceId.pricing.filter(
    (p) => p?._id.toString() === order?.pricingId.toString()
  )
  const updatedOrder = order.toObject()

  updatedOrder.serviceId.pricing = updatedPricing

  return sendResponse(res, updatedOrder)
}
