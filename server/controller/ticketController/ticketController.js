import mongoose, { Types } from 'mongoose'
import Ticket from '../../model/ticketModels/ticketModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import TicketChat from '../../model/ticketModels/ticketChatModels.js'
import {
  createNotification,
  updateNotification,
} from '../notificationController/notificationController.js'
import Team from '../../model/userModels/teamModel.js'
import Notification from '../../model/notificationModels/notificationModel.js'
import MessageNotification from '../../model/notificationModels/messageNotificationModel.js'

export const createTicket = async (req, res, next) => {
  try {
    const data = await Ticket.create({ ...req.body, userId: req.user?._id })

    await createNotification({
      content: data?.description,
      title: data?.title,
      type: 'Ticket',
      to: 'ticket',
      id: data?._id,
      userId: data.userId,
    })

    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const getAllTickets = async (req, res, next) => {
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
              orderId: Types.ObjectId.isValid(search)
                ? new Types.ObjectId(search)
                : null,
            },
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

    const accessOf = req.query?.access?.tickets?.accessOf || []

    if (req.query.access) {
      pipeline.push({ $match: { _id: { $in: accessOf } } })
    }

    const [tickets, totalCount] = await Promise.all([
      Ticket.aggregate(pipeline),
      Ticket.countDocuments(query),
    ])

    const response = {
      tickets,
      totalDocsCount: totalCount,
    }

    return sendResponse(res, response)
  } catch (error) {
    next(error)
  }
}

export const getTicketById = async (req, res, next) => {
  try {
    const data = await Ticket.findById({ _id: req.params.id }).populate({
      path: 'orderId',
      model: 'Order',
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const updateTicket = async (req, res, next) => {
  try {
    const data = await Ticket.findOne({ _id: req.params.id })

    const alwaysRestrictedFields = ['userId', 'orderId']
    const restrictedFields = ['status']

    if (req.user.role === 'user' || req.user.role === 'userMember') {
      restrictedFields.forEach((field) => {
        if (req.body.hasOwnProperty(field)) {
          delete req.body[field]
        }
      })
    }

    if (
      data.userId.toString() === req.user._id.toString() ||
      (data.userId.toString() === req.user.creatorId?.toString() &&
        req.user?.access?.tickets?.accessOf.includes(data?._id)) ||
      req.user.role === 'admin' ||
      (req.user.role === 'adminMember' &&
        req.user?.access?.tickets?.accessOf.includes(data?._id))
    ) {
      Object.keys(req.body).forEach((key) => {
        if (!alwaysRestrictedFields.includes(key)) {
          data[key] = req.body[key]
        }
      })

      data.save()

      await updateNotification({
        content: data?.description,
        title: data?.title,
        type: 'Ticket',
        to: 'ticket',
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

export const deleteTicket = async (req, res, next) => {
  try {
    const data = await Ticket.findOne({ _id: req.params.id })

    if (!data) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    if (
      data.userId.toString() === req.user._id.toString() ||
      (data.userId.toString() === req.user.creatorId?.toString() &&
        req.user?.access?.tickets?.accessOf.includes(data?._id)) ||
      req.user.role === 'admin' ||
      (req.user.role === 'adminMember' &&
        req.user?.access?.tickets?.accessOf.includes(data?._id))
    ) {
      await Promise.all([
        data.deleteOne(),
        TicketChat.deleteOne({ ticketId: data._id }),
        Team.updateMany(
          { 'access.tickets.accessOf': data._id },
          { $pull: { 'access.tickets.accessOf': data._id } }
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
