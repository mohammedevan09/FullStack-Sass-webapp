import mongoose from 'mongoose'

const AffiliateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    clicks: { type: Number, default: 0 },
    visitors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    signUps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    paidEarnings: Number,
    totalEarnings: Number,
  },
  {
    timestamps: true,
  }
)

const Affiliate = mongoose.model('Affiliate', AffiliateSchema)
export default Affiliate
