import mongoose from 'mongoose'
import OrderChat from '../../model/orderModels/orderChatModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

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
          localField: 'participants.participantId',
          foreignField: '_id',
          as: 'userParticipants',
        },
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'participants.participantId',
          foreignField: '_id',
          as: 'teamParticipants',
        },
      },
      {
        $project: {
          _id: 1,
          participants: {
            $concatArrays: ['$userParticipants', '$teamParticipants'],
          },
          orderId: 1,
          messages: {
            $slice: [{ $reverseArray: '$messages' }, (page - 1) * limit, limit],
          },
        },
      },
      {
        $unwind: {
          path: '$messages',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: { 'messages.createdAt': 1 },
      },
      {
        $group: {
          _id: '$_id',
          participants: { $first: '$participants' },
          orderId: { $first: '$orderId' },
          messages: { $push: '$messages' },
        },
      },
      {
        $project: {
          _id: 1,
          participants: {
            $map: {
              input: '$participants',
              as: 'participant',
              in: {
                _id: '$$participant._id',
                fullName: '$$participant.fullName',
                email: '$$participant.email',
                profileImage: '$$participant.profileImage',
                position: '$$participant.position',
                role: '$$participant.role',
              },
            },
          },
          orderId: 1,
          messages: {
            $slice: ['$messages', page * limit],
          },
        },
      },
    ]

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
