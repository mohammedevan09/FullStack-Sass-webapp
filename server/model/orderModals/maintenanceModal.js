import mongoose from 'mongoose'
import Order from '../orderModal.js'

const maintenanceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['small', 'medium', 'large'],
      required: true,
    },

    subscriptionId: {
      type: String,
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
