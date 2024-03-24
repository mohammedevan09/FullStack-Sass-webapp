import mongoose from 'mongoose'
import Service, { pricingSchema } from './serviceModel.js'

const normalServiceSchema = new mongoose.Schema({
  pricing: [pricingSchema],
})

const NormalService = Service.discriminator(
  'NormalService',
  normalServiceSchema
)
export default NormalService
