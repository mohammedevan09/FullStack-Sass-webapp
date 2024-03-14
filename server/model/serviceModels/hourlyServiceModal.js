import mongoose from 'mongoose'
import Service from '../serviceModal.js'

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
  services: [
    {
      amount: {
        type: Number,
        required: true,
      },
      hours: {
        type: Number,
        required: true,
      },
      valueType: {
        type: String,
      },
    },
  ],
})

const HourlyService = Service.discriminator('HourlyService', hourlyServiceModal)
export default HourlyService
