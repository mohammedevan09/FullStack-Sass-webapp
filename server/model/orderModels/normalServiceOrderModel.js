import mongoose from 'mongoose'
import Order from './orderModel.js'

const normalServiceOrderSchema = new mongoose.Schema()

const NormalServiceOrder = Order.discriminator(
  'NormalServiceOrder',
  normalServiceOrderSchema
)
export default NormalServiceOrder
