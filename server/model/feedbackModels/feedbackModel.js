import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema(
  {
    details: {
      type: String,
      required: true,
    },
    feedbackCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedbackCategory',
      required: true,
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

const Feedback = mongoose.model('Feedback', FeedbackSchema)
export default Feedback
