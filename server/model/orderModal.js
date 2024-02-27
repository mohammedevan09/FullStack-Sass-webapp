import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    projectTrackingBoard: {
      todo: [{ title: String }],
      inProgress: [{ title: String }],
      complete: [{ title: String }],
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
