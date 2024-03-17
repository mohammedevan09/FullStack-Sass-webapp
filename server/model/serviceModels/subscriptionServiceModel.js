import mongoose from 'mongoose'
import Service, { pricingSchema } from './serviceModel.js'

const subscriptionServiceModal = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  pricing: [pricingSchema],
})

const SubscriptionService = Service.discriminator(
  'SubscriptionService',
  subscriptionServiceModal
)
export default SubscriptionService
