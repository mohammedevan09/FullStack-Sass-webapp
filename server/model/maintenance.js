import mongoose from 'mongoose'
import Order from './orderModal'

const maintenanceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    websiteLoginURL: { type: String },
    userNameOrEmail: { type: String },
    password: { type: String },
    virtualMeetingNeeded: { type: Boolean },

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

const Maintenance = Order.discriminator('Maintenance', maintenanceSchema)
export default Maintenance
