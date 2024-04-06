import mongoose from 'mongoose'
import Order from './orderModel.js'

const subscriptionServiceOrderSchema = new mongoose.Schema({
  subscriptionRenew: {
    type: mongoose.Schema.Types.Mixed,
  },
  subscriptionType: {
    type: String,
    required: true,
  },
})

const SubscriptionServiceOrder = Order.discriminator(
  'SubscriptionServiceOrder',
  subscriptionServiceOrderSchema
)
export default SubscriptionServiceOrder
