import mongoose from 'mongoose'

const VisitorSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      unique: true,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
)

const AffiliateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    visitors: [VisitorSchema],
    paidEarnings: { type: Number, default: 0 },
    paymentAccounts: {
      paypal: String,
    },
  },
  {
    timestamps: true,
  }
)

const Affiliate = mongoose.model('Affiliate', AffiliateSchema)
export default Affiliate
