import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    pricingId: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: 'Service',
      required: true,
    },
    additionalInfo: [
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
    projectTrackingBoard: {
      todo: [{ title: String }],
      inProgress: [{ title: String }],
      complete: [{ title: String }],
    },
    customerId: {
      type: String,
    },
    payment_method_types: {
      type: String,
      enum: ['card', 'paypal', 'manually'],
      default: 'manually',
    },
    payment_intent: {
      type: String,
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'cancel'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['pending', 'running', 'done'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

orderSchema.virtual('pricing', {
  ref: 'Service',
  localField: 'pricingId',
  foreignField: 'pricing._id',
  justOne: true,
})

const Order = mongoose.model('Order', orderSchema)
export default Order
