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
