import { Types } from 'mongoose'
import Order from '../model/orderModels/orderModel.js'
import Ticket from '../model/ticketModels/ticketModel.js'
import Proposal from '../model/proposalsModels/proposalsModel.js'
import { sendResponse } from '../utils/sendResponse.js'

export const searchAllCollections = async (req, res, next) => {
  try {
    const { userId, role, access, page = 1, limit = 5, search = '' } = req.query

    if (!search) {
      return res.status(400).json({ message: 'Search query is required' })
    }

    const query = {
      ...(userId &&
        (role === 'user' || role === 'userMember') && {
          userId: new Types.ObjectId(userId),
        }),
    }

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
      const accessOf = [
        ...(access.orders?.accessOf || []),
        ...(access.tickets?.accessOf || []),
        ...(access.proposals?.accessOf || []),
      ].map((id) => new Types.ObjectId(id))

      if (accessOf.length > 0) {
        matchStage.$match._id = { $in: accessOf }
      }
    }

    const projectStage = {
      $project: {
        title: 1,
        description: 1,
        _id: 1,
        __t: 1,
        modelType: { $literal: 'Order' },
      },
    }

    const pipeline = [
      matchStage,
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (parseInt(page, 10) - 1) * parseInt(limit, 10),
      },
      {
        $limit: parseInt(limit, 10),
      },
      projectStage,
    ]

    const [orderCount, ticketCount, proposalCount] = await Promise.all([
      Order.countDocuments(matchStage.$match),
      Ticket.countDocuments(matchStage.$match),
      Proposal.countDocuments(matchStage.$match),
    ])

    const totalDocsCount = orderCount + ticketCount + proposalCount

    const [orderResults, ticketResults, proposalResults] = await Promise.all([
      Order.aggregate([
        ...pipeline.slice(0, -1),
        {
          $project: {
            ...projectStage.$project,
            modelType: { $literal: 'Order' },
          },
        },
      ]),
      Ticket.aggregate([
        ...pipeline.slice(0, -1),
        {
          $project: {
            ...projectStage.$project,
            modelType: { $literal: 'Ticket' },
          },
        },
      ]),
      Proposal.aggregate([
        ...pipeline.slice(0, -1),
        {
          $project: {
            ...projectStage.$project,
            modelType: { $literal: 'Proposal' },
          },
        },
      ]),
    ])

    const combinedResults = [
      ...orderResults,
      ...ticketResults,
      ...proposalResults,
    ]

    return sendResponse(res, { results: combinedResults, totalDocsCount })
  } catch (error) {
    next(error)
  }
}
