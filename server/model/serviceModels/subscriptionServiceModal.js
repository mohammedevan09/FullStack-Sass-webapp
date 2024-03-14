import mongoose from 'mongoose'
import Service from '../serviceModal.js'

const subscriptionServiceModal = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  services: [
    {
      amount: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      subName: {
        type: String,
        required: true,
      },
      availableService: [],
      unavailableService: [],
    },
  ],
})

const SubscriptionService = Service.discriminator(
  'SubscriptionService',
  subscriptionServiceModal
)
export default SubscriptionService
