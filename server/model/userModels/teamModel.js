import mongoose from 'mongoose'

const accessTypes = {
  orders: {
    access: { type: Boolean, default: false },
    accessOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  proposals: {
    access: { type: Boolean, default: false },
    accessOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' }],
  },
  tickets: {
    access: { type: Boolean, default: false },
    accessOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  },
  invoice: {
    access: { type: Boolean, default: false },
    accessOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }],
  },
  meetings: {
    access: { type: Boolean, default: false },
    accessOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' }],
  },
  affiliate: {
    access: { type: Boolean, default: false },
    accessOf: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' }],
  },
  settings: {
    access: { type: Boolean, default: true },
  },
}

const TeamSchema = new mongoose.Schema(
  {
    access: accessTypes,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    password: {
      type: String,
    },
    originalPass: {
      type: String,
    },
    number: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: '',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['userMember', 'adminMember'],
      default: 'userMember',
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

TeamSchema.path('access.orders.accessOf').default([])
TeamSchema.path('access.proposals.accessOf').default([])
TeamSchema.path('access.tickets.accessOf').default([])
TeamSchema.path('access.invoice.accessOf').default([])
TeamSchema.path('access.meetings.accessOf').default([])
TeamSchema.path('access.affiliate.accessOf').default([])

const Team = mongoose.model('Team', TeamSchema)
export default Team
