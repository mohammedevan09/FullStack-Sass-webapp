import mongoose from 'mongoose'
import Order from '../orderModal.js'

const hourlyPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['small', 'medium', 'large'],
      required: true,
    },

    websiteFeatures: [
      {
        title: {
          type: String,
          required: true,
        },
        value: {
          type: mongoose.Schema.Types.Mixed,
        },
      },
    ],

    // Additional options
    additionalOptions: [
      {
        title: {
          type: String,
          required: true,
        },
        value: {
          type: mongoose.Schema.Types.Mixed,
        },
      },
    ],

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const HourlyPlan = Order.discriminator('HourlyPlan', hourlyPlanSchema)
export default HourlyPlan
