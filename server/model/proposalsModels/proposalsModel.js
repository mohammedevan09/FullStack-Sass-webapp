import mongoose from 'mongoose'

const ProposalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    details: {
      executive_summary: {
        problem_overview: mongoose.Schema.Types.Mixed,
        problem_solution: mongoose.Schema.Types.Mixed,
      },
      scope_of_work: {
        features: mongoose.Schema.Types.Mixed,
        resources_required: mongoose.Schema.Types.Mixed,
      },
      lastProposalBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      isAccepted: {
        type: Boolean,
        default: false,
      },
      isMeeting: {
        type: Boolean,
        default: false,
      },
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
      enum: ['pending', 'paid', 'canceled'],
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
    timeline: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Proposal = mongoose.model('Proposal', ProposalSchema)
export default Proposal
