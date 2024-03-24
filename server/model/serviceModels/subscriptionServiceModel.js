import mongoose from 'mongoose'
import Service, { pricingSchema } from './serviceModel.js'

const subscriptionServiceModal = new mongoose.Schema({
  pricing: [pricingSchema],
})

const SubscriptionService = Service.discriminator(
  'SubscriptionService',
  subscriptionServiceModal
)
export default SubscriptionService
