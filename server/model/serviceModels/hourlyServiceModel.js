import mongoose from 'mongoose'
import Service from './serviceModel.js'

const hourlyPricing = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
)

const hourlyServiceModal = new mongoose.Schema({
  availableService: [String],
  pricing: [hourlyPricing],
})

const HourlyService = Service.discriminator('HourlyService', hourlyServiceModal)

export default HourlyService
