import mongoose from 'mongoose'
import Order from './orderModel.js'

const SubscriptionEventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      enum: ['created', 'updated', 'canceled', 'renewed'],
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
)

const subscriptionServiceOrderSchema = new mongoose.Schema({
  startTime: mongoose.Schema.Types.Mixed,
  endTime: mongoose.Schema.Types.Mixed,
  subscriptionType: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly',
  },
  events: {
    type: [SubscriptionEventSchema],
    default: [],
  },
})

const SubscriptionServiceOrder = Order.discriminator(
  'SubscriptionServiceOrder',
  subscriptionServiceOrderSchema
)
export default SubscriptionServiceOrder
