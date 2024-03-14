import mongoose from 'mongoose'
import Service from './serviceModal.js'

const normalServiceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  services: [
    {
      amount: {
        type: Number,
        required: true,
      },
      type: {
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

const NormalService = Service.discriminator(
  'NormalService',
  normalServiceSchema
)
export default NormalService
