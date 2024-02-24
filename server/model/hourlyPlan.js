import mongoose from 'mongoose'
import Order from './orderModal'

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

    virtualMeeting: {
      type: Boolean,
      default: false,
    },

    paymentGateway: {
      type: String,
      required: true,
      enum: ['stripe', 'paypal'],
    },
    paymentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const HourlyPlan = Order.discriminator('HourlyPlan', hourlyPlanSchema)
export default HourlyPlan
