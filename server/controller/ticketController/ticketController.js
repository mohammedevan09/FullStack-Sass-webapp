import mongoose, { Types } from 'mongoose'
import Ticket from '../../model/tickerModels/ticketModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import TicketChat from '../../model/tickerModels/ticketChatModels.js'
import {
  createNotification,
  updateNotification,
} from '../notificationController/notificationController.js'

export const createTicket = async (req, res, next) => {
  try {
    const data = await Ticket.create(req.body)

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
    const data = await Ticket.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )
    await updateNotification({
      content: data?.description,
      title: data?.title,
      type: 'Ticket',
      to: 'ticket',
      id: data?._id,
      userId: data.userId,
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const deleteTicket = async (req, res, next) => {
  try {
    const data = await Ticket.findByIdAndDelete({ _id: req.params.id })

    await TicketChat.deleteOne({
      ticketId: data?._id,
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
