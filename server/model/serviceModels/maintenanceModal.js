import mongoose from 'mongoose'
import Order from '../orderModal.js'

const maintenanceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

const Maintenance = Order.discriminator('Maintenance', maintenanceSchema)
export default Maintenance

// websiteLoginURL: { type: String },
// userNameOrEmail: { type: String },
// password: { type: String },
