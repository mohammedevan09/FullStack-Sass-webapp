import mongoose, { Types } from 'mongoose'
import Ticket from '../../model/tickerModels/ticketModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createTicket = async (req, res, next) => {
  try {
    const data = await Ticket.create(req.body)

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

    const ticket = await Ticket.aggregate(pipeline)

    return sendResponse(res, ticket)
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

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const deleteTicket = async (req, res, next) => {
  try {
    const data = await Ticket.findByIdAndDelete({ _id: req.params.id })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
