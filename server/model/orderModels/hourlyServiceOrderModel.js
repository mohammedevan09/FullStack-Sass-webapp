import mongoose from 'mongoose'
import Order from './orderModel.js'

const hourlyServiceOrderSchema = new mongoose.Schema(
  {
    totalHours: {
      type: Number,
      required: true,
    },
    spentHours: {
      type: Number,
      required: true,
      default: 0,
    },
    remainHours: {
      type: Number,
      required: true,
      default: 0,
    },

    hourlyTimeLogs: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        time: {
          type: mongoose.Schema.Types.Mixed,
        },
        date: {
          type: mongoose.Schema.Types.Mixed,
        },
        loggedHours: {
          type: mongoose.Schema.Types.Mixed,
        },
      },
    ],
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
