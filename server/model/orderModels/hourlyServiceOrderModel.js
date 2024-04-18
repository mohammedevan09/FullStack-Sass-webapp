import mongoose from 'mongoose'
import Order from './orderModel.js'

const hourlyTimeLogSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  memo: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
})

const hourlyServiceOrderSchema = new mongoose.Schema(
  {
    totalHours: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    spentHours: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: '00 hours 00 minutes',
    },
    remainHours: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    hourlyTimeLogs: [hourlyTimeLogSchema],
  },
  {
    timestamps: true,
  }
)

const HourlyServiceOrder = Order.discriminator(
  'HourlyServiceOrder',
  hourlyServiceOrderSchema
)

export default HourlyServiceOrder
