import mongoose from 'mongoose'
import Order from '../orderModal.js'

const hourlyPlanSchema = new mongoose.Schema(
  {
    totalHours: {
      type: Number,
      required: true,
    },
    spentHours: {
      type: Number,
      required: true,
    },
    remainHours: {
      type: Number,
      required: true,
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

const HourlyPlan = Order.discriminator('HourlyPlan', hourlyPlanSchema)
export default HourlyPlan
