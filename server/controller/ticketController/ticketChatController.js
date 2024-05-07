import mongoose from 'mongoose'
import { sendResponse } from '../../utils/sendResponse.js'
import TicketChat from '../../model/tickerModels/ticketChatModels.js'

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
        $project: {
          _id: 1,
          participants: {
            $concatArrays: ['$userParticipants', '$teamParticipants'],
          },
          ticketId: 1,
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
          ticketId: { $first: '$ticketId' },
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
          ticketId: 1,
          messages: {
            $slice: ['$messages', page * limit],
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
        $project: {
          messageCount: { $size: '$messages' },
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
