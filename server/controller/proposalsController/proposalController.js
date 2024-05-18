import mongoose, { Types } from 'mongoose'
import { sendResponse } from '../../utils/sendResponse.js'
import Proposal from '../../model/proposalsModels/proposalsModel.js'
import ProposalChat from '../../model/proposalsModels/proposalsChatModel.js'
import {
  createNotification,
  updateNotification,
} from '../notificationController/notificationController.js'

export const createProposal = async (req, res, next) => {
  try {
    const data = await Proposal.create(req.body)

    await createNotification({
      content: data?.description,
      title: `A proposal name "${data?.title}"`,
      type: 'Proposal',
      to: 'invoiceAndProposal',
      id: data?._id,
      userId: data.userId,
    })

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

    if (req.query.status) {
      query.status = req.query.status
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

    const [proposals, totalCount] = await Promise.all([
      Proposal.aggregate(pipeline),
      Proposal.countDocuments(query),
    ])

    const response = {
      proposals,
      totalDocsCount: totalCount,
    }

    return sendResponse(res, response)
  } catch (error) {
    next(error)
  }
}

export const getProposalById = async (req, res, next) => {
  try {
    const data = await Proposal.findById({ _id: req.params.id }).populate({
      path: 'details.lastProposalBy',
      model: 'User',
      select: 'fullName email profileImage _id number',
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

    await updateNotification({
      content: data?.description,
      title: `Update of proposal name "${data?.title}"`,
      type: 'Proposal',
      to: 'invoiceAndProposal',
      id: data?._id,
      userId: data.userId,
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const deleteProposal = async (req, res, next) => {
  try {
    const data = await Proposal.findByIdAndDelete({ _id: req.params.id })

    await ProposalChat.deleteOne({
      proposalId: data?._id,
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
