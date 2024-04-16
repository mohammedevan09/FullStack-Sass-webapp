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
    totalAmount: {
      type: Number,
      required: true,
    },
    pricingId: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: 'Service',
      required: true,
    },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    additionalInfo: {},
    projectTrackingBoard: {
      todo: [{ title: String }],
      inProgress: [{ title: String }],
      complete: [{ title: String }],
    },
    payment_info: {
      customerId: String,
      payment_intent: String,
      subscriptionId: String,
    },
    payment_method_types: {
      type: String,
      enum: ['card', 'paypal', 'manually'],
      default: 'manually',
    },
    payment_status: {
      type: String,
      enum: ['pending', 'done', 'canceled'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['pending', 'running', 'done', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
