import mongoose from 'mongoose'
import Order from './orderModel.js'

const websiteDesignAndDevSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
)

const WebsiteDesignAndDev = Order.discriminator(
  'WebsiteDesignAndDev',
  websiteDesignAndDevSchema
)
export default WebsiteDesignAndDev

// services: {
//   type: String,
// },
// targetAudience: {
//   type: String,
// },
// uniqueSellingPoints: {
//   type: String,
// },

// websiteFeatures: {
//   type: String,
// },

// competitorWebsites: {
//   type: String,
// },

// styleGuide: {
//   type: String,
// },
