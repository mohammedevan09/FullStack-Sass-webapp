import mongoose from 'mongoose'

const ProposalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Object,
      required: true,
    },
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
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Proposal = mongoose.model('Proposal', ProposalSchema)
export default Proposal
