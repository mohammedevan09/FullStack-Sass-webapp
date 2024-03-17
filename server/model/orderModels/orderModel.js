import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectTrackingBoard: {
      todo: [{ title: String }],
      inProgress: [{ title: String }],
      complete: [{ title: String }],
    },
    amount: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      // required: true,
    },
    customerId: {
      type: String,
    },
    payment_method_types: {
      type: String,
      enum: ['card', 'paypal'],
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

const Order = mongoose.model('Order', orderSchema)
export default Order
