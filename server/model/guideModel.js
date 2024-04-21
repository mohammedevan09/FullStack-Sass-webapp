import mongoose from 'mongoose'

const GuideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Guide = mongoose.model('Guide', GuideSchema)
export default Guide
