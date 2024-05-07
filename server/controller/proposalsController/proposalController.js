import mongoose, { Types } from 'mongoose'
import { sendResponse } from '../../utils/sendResponse.js'
import Proposal from '../../model/proposalsModels/proposalsModel.js'

export const createProposal = async (req, res, next) => {
  try {
    const data = await Proposal.create(req.body)

    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const getAllProposals = async (req, res, next) => {
  try {
    let query = {}
    const { page = 1, limit = 10, search = '' } = req.query

    if (
      req.query.userId &&
      (req.query.role === 'user' || req.query.role === 'userMember')
    ) {
      query.userId = new mongoose.Types.ObjectId(req.query.userId)
    }

    const pipeline = [
      {
        $match: {
          ...query,
          $or: [
            { title: { $regex: new RegExp(search), $options: 'i' } },
            {
              _id: Types.ObjectId.isValid(search)
                ? new Types.ObjectId(search)
                : null,
            },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (parseInt(page) - 1) * parseInt(limit),
      },
      {
        $limit: parseInt(limit),
      },
    ]

    const accessOf = req.query?.access?.proposals?.accessOf || []

    if (req.query.access) {
      pipeline.push({ $match: { _id: { $in: accessOf } } })
    }

    const data = await Proposal.aggregate(pipeline)

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const getProposalById = async (req, res, next) => {
  try {
    const data = await Proposal.findById({ _id: req.params.id }).populate({
      path: 'orderId',
      model: 'Order',
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const updateProposal = async (req, res, next) => {
  try {
    const data = await Proposal.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const deleteProposal = async (req, res, next) => {
  try {
    const data = await Proposal.findByIdAndDelete({ _id: req.params.id })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
