import mongoose from 'mongoose'
import OrderChat from '../../model/orderModels/orderChatModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createOrderChatMessage = async (req, res, next) => {
  try {
    const message = await OrderChat.create(req.body)

    return res.status(200).json(message)
  } catch (error) {
    next(error)
  }
}

export const addMessageToOrderChat = async (req, res, next) => {
  const { id } = req.params

  try {
    const { orderId, sender, content } = req.body

    const orderChat = await OrderChat.findOne({ _id: id, orderId })

    if (!orderChat) {
      return res.status(404).json({ message: 'OrderChat not found' })
    }

    const newMessage = {
      sender: sender,
      content: content,
    }

    orderChat.messages.push(newMessage)

    await orderChat.save()

    res.status(200).json(orderChat)
  } catch (error) {
    next(error)
  }
}

export const getChatByOrderId = async (req, res, next) => {
  const { orderId } = req.params
  let { page = 1, limit = 10 } = req.query

  page = parseInt(page)
  limit = parseInt(limit)

  try {
    const pipeline = [
      {
        $match: {
          orderId: new mongoose.Types.ObjectId(orderId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participants',
          foreignField: '_id',
          as: 'participantsInfo',
        },
      },
      {
        $project: {
          _id: 1,
          participants: 1,
          orderId: 1,
          participantsInfo: {
            $map: {
              input: '$participantsInfo',
              as: 'participant',
              in: {
                _id: '$$participant._id',
                email: '$$participant.email',
                fullName: '$$participant.fullName',
                profileImage: '$$participant.profileImage',
                role: '$$participant.role',
                position: '$$participant.position',
              },
            },
          },
          messages: {
            $slice: [
              { $reverseArray: '$messages' }, // Reverse the messages array
              (page - 1) * limit,
              limit,
            ],
          },
        },
      },
      {
        $unwind: {
          path: '$messages',
          preserveNullAndEmptyArrays: true, // Preserve empty arrays
        },
      },
      {
        $sort: { 'messages.createdAt': 1 }, // Sort messages by createdAt in ascending order
      },
      {
        $group: {
          _id: '$_id',
          participants: { $first: '$participants' },
          orderId: { $first: '$orderId' },
          participantsInfo: { $first: '$participantsInfo' },
          messages: { $push: '$messages' },
        },
      },
      {
        $project: {
          _id: 1,
          participants: 1,
          orderId: 1,
          participantsInfo: 1,
          messages: {
            $slice: ['$messages', page * limit], // Final slice based on pagination
          },
        },
      },
    ]

    // Count the total number of messages
    const countPipeline = [
      {
        $match: {
          orderId: new mongoose.Types.ObjectId(orderId),
        },
      },
      {
        $project: {
          messageCount: { $size: '$messages' },
        },
      },
    ]

    const [orderChat, messageCount] = await Promise.all([
      OrderChat.aggregate(pipeline),
      OrderChat.aggregate(countPipeline),
    ])

    const result = {
      chat: orderChat[0],
      messageCount: messageCount.length > 0 ? messageCount[0].messageCount : 0,
    }

    return sendResponse(res, result)
  } catch (error) {
    next(error)
  }
}
