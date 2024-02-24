import mongoose from 'mongoose'
import Order from './orderModal'

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
    services: [
      {
        type: String,
      },
    ],
    targetAudience: {
      type: String,
    },
    uniqueSellingPoints: [
      {
        type: String,
      },
    ],
    websiteFeatures: [
      {
        type: String,
      },
    ],
    competitorWebsites: [
      {
        type: String,
      },
    ],
    styleGuide: {
      type: String,
    },

    // Additional options
    domainHosting: {
      type: Boolean,
      default: false,
    },
    ongoingSupport: {
      type: Boolean,
      default: false,
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

const WebsiteDesignAndDev = Order.discriminator(
  'WebsiteDesignAndDev',
  websiteDesignAndDevSchema
)
export default WebsiteDesignAndDev
