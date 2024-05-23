import mongoose from 'mongoose'
import { sendResponse } from '../../utils/sendResponse.js'
import TicketChat from '../../model/ticketModels/ticketChatModels.js'

export const getChatByTicketId = async (req, res, next) => {
  const { ticketId } = req.params
  let { page = 1, limit = 10 } = req.query

  page = parseInt(page)
  limit = parseInt(limit)

  try {
    const pipeline = [
      {
        $match: {
          ticketId: new mongoose.Types.ObjectId(ticketId),
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
        $lookup: {
          from: 'messages',
          localField: 'messages',
          foreignField: '_id',
          as: 'messageDetails',
        },
      },
      {
        $project: {
          _id: 1,
          participants: {
            $concatArrays: ['$userParticipants', '$teamParticipants'],
          },
          ticketId: 1,
          messageDetails: {
            $slice: [
              { $reverseArray: '$messageDetails' },
              (page - 1) * limit,
              limit,
            ],
          },
        },
      },
      {
        $unwind: {
          path: '$messageDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: { 'messageDetails.createdAt': 1 },
      },
      {
        $group: {
          _id: '$_id',
          participants: { $first: '$participants' },
          ticketId: { $first: '$ticketId' },
          messageDetails: { $push: '$messageDetails' },
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
          ticketId: 1,
          messages: {
            $slice: ['$messageDetails', page * limit],
          },
        },
      },
    ]

    const countPipeline = [
      {
        $match: {
          ticketId: new mongoose.Types.ObjectId(ticketId),
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'messages',
          foreignField: '_id',
          as: 'messageDetails',
        },
      },
      {
        $project: {
          messageCount: { $size: '$messageDetails' },
        },
      },
    ]

    const [ticketChat, messageCount] = await Promise.all([
      TicketChat.aggregate(pipeline),
      TicketChat.aggregate(countPipeline),
    ])

    const result = {
      chat: ticketChat[0],
      messageCount: messageCount.length > 0 ? messageCount[0].messageCount : 0,
    }

    return sendResponse(res, result)
  } catch (error) {
    next(error)
  }
}
