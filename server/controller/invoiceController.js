import { Types } from 'mongoose'
import Order from '../model/orderModels/orderModel.js'
import Proposal from '../model/proposalsModels/proposalsModel.js'

export const getAllInvoices = async (req, res, next) => {
  try {
    const {
      __t,
      status,
      userId,
      role,
      access,
      page = 1,
      limit = 10,
      search = '',
    } = req.query

    const query = {
      ...(__t && { __t }),
      ...(status && { status }),
      ...(userId &&
        (role === 'user' || role === 'userMember') && {
          userId: new Types.ObjectId(userId),
        }),
    }

    const accessOf = access?.orders?.accessOf || []
    const halfLimit = Math.ceil(parseInt(limit) / 2)
    const skip = (parseInt(page) - 1) * parseInt(halfLimit)

    const matchStage = {
      $match: {
        ...query,
        $or: [
          { title: { $regex: new RegExp(search, 'i') } },
          {
            _id: Types.ObjectId.isValid(search)
              ? new Types.ObjectId(search)
              : null,
          },
        ],
      },
    }

    if (access) {
      matchStage.$match._id = { $in: accessOf }
    }

    const orderPipeline = [
      matchStage,
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(halfLimit) },
      {
        $project: {
          _id: 1,
          title: 1,
          updatedAt: 1,
          totalAmount: 1,
          payment_status: 1,
          status: 1,
        },
      },
    ]

    const proposalMatchStage = {
      ...matchStage,
      $match: {
        ...matchStage.$match,
        'details.isAccepted': { $ne: false },
      },
    }

    const proposalPipeline = [
      proposalMatchStage,
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(halfLimit) },
      {
        $project: {
          _id: 1,
          title: 1,
          updatedAt: 1,
          totalAmount: 1,
          payment_status: 1,
          status: 1,
        },
      },
    ]

    const [orders, proposals] = await Promise.all([
      Order.aggregate(orderPipeline),
      Proposal.aggregate(proposalPipeline),
    ])

    const combinedResults = [...orders, ...proposals].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )

    return res.status(200).json({
      results: combinedResults,
      page,
      limit,
      totalOrders: orders.length,
      totalProposals: proposals.length,
    })
  } catch (error) {
    next(error)
  }
}
