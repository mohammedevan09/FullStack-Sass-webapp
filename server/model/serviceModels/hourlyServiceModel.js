import mongoose from 'mongoose'
import Service from './serviceModel.js'

export const hourlyPricing = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    serviceType: {
      type: String,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
)

const hourlyServiceModal = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  availableService: [],
  pricing: [hourlyPricing],
})

const HourlyService = Service.discriminator('HourlyService', hourlyServiceModal)
export default HourlyService
