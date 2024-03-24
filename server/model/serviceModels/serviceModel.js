import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    subheading: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const pricingSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    subName: {
      type: String,
      required: true,
    },
    availableService: [String],
    unavailableService: [String],
  },
  {
    versionKey: false,
  }
)

const Service = mongoose.model('Service', ServiceSchema)
export default Service
