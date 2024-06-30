import mongoose, { Types } from 'mongoose'
import { sendResponse } from '../../utils/sendResponse.js'
import Proposal from '../../model/proposalsModels/proposalsModel.js'
import ProposalChat from '../../model/proposalsModels/proposalsChatModel.js'
import {
  createNotification,
  updateNotification,
} from '../notificationController/notificationController.js'
import Team from '../../model/userModels/teamModel.js'
import Notification from '../../model/notificationModels/notificationModel.js'
import MessageNotification from '../../model/notificationModels/messageNotificationModel.js'

export const createProposal = async (req, res, next) => {
  try {
    const data = await Proposal.create({ ...req.body, userId: req.user._id })

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

export const createStripeProposalOrder = async (customer, data, res) => {
  try {
    const proposal = await Proposal.findById(customer?.metadata?.proposalId)

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found!' })
    }

    proposal.payment_info = {
      customerId: data?.customer,
      'Payment Phone': data?.customer_details?.phone,
    }
    proposal.payment_status = data?.payment_status
    proposal.payment_method_types = data?.payment_method_types[0]
    proposal.status = 'running'

    await proposal.save()

    await updateNotification({
      content: proposal?.description,
      title: `A proposal name "${proposal?.title}"`,
      type: 'Proposal',
      to: 'invoiceAndProposal',
      id: proposal?._id,
      userId: proposal.userId,
    })

    return res.status(201).json({ message: 'Proposal completed successfully' })
  } catch (error) {
    return res.status(500).json({ message: error?.message })
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
      {
        $project: {
          _id: 1,
          title: 1,
          'details.isAccepted': 1,
          'details.lastProposalBy': 1,
          status: 1,
          timeline: 1,
        },
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
    const data = await Proposal.findOne({ _id: req.params.id })

    const alwaysRestrictedFields = ['totalAmount', 'timeline']
    const restrictedFields = [
      'payment_info',
      'payment_method_types',
      'payment_status',
      'status',
    ]

    if (req.user.role === 'user' || req.user.role === 'userMember') {
      restrictedFields.forEach((field) => {
        if (req.body.hasOwnProperty(field)) {
          delete req.body[field]
        }
      })
    }

    if (data?.details?.isAccepted === true) {
      alwaysRestrictedFields.forEach((field) => {
        if (req.body.hasOwnProperty(field)) {
          delete req.body[field]
        }
      })
    }

    if (
      data.userId.toString() === req.user._id.toString() ||
      (data.userId.toString() === req.user.creatorId?.toString() &&
        req.user?.access?.proposals?.accessOf.includes(data?._id)) ||
      req.user.role === 'admin' ||
      (req.user.role === 'adminMember' &&
        req.user?.access?.proposals?.accessOf.includes(data?._id))
    ) {
      Object.keys(req.body).forEach((key) => {
        data[key] = req.body[key]
      })

      data.save()

      await updateNotification({
        content: data?.description,
        title: `Update of proposal name "${data?.title}"`,
        type: 'Proposal',
        to: 'invoiceAndProposal',
        id: data?._id,
        userId: data.userId,
      })

      return sendResponse(res, data)
    } else {
      return res.status(403).json({ message: 'You are not permitted' })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteProposal = async (req, res, next) => {
  try {
    const data = await Proposal.findOne({ _id: req.params.id })

    if (!data) {
      return res.status(404).json({ message: 'Proposal not found' })
    }

    if (
      data.userId.toString() === req.user._id.toString() ||
      (data.userId.toString() === req.user.creatorId?.toString() &&
        req.user?.access?.proposals?.accessOf.includes(data?._id)) ||
      req.user.role === 'admin' ||
      (req.user.role === 'adminMember' &&
        req.user?.access?.proposals?.accessOf.includes(data?._id))
    ) {
      await Promise.all([
        data.deleteOne(),
        ProposalChat.deleteOne({
          proposalId: data?._id,
        }),
        Team.updateMany(
          { 'access.proposals.accessOf': data._id },
          { $pull: { 'access.proposals.accessOf': data._id } }
        ),
        Notification.deleteMany({ id: data._id }),
        MessageNotification.deleteMany({ id: data._id }),
      ])
      return sendResponse(res, { message: 'Deleted Successfully' })
    } else {
      return res.status(403).json({ message: 'You are not permitted' })
    }
  } catch (error) {
    next(error)
  }
}
