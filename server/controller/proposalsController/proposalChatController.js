import mongoose from 'mongoose'
import { sendResponse } from '../../utils/sendResponse.js'
import ProposalChat from '../../model/proposalsModels/proposalsChatModel.js'

export const getChatByProposalId = async (req, res, next) => {
  const { proposalId } = req.params
  let { page = 1, limit = 10 } = req.query

  page = parseInt(page)
  limit = parseInt(limit)

  try {
    const pipeline = [
      {
        $match: {
          proposalId: new mongoose.Types.ObjectId(proposalId),
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
          proposalId: 1,
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
          proposalId: { $first: '$proposalId' },
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
          proposalId: 1,
          messages: {
            $slice: ['$messageDetails', page * limit],
          },
        },
      },
    ]

    const countPipeline = [
      {
        $match: {
          proposalId: new mongoose.Types.ObjectId(proposalId),
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

    const [proposalChat, messageCount] = await Promise.all([
      ProposalChat.aggregate(pipeline),
      ProposalChat.aggregate(countPipeline),
    ])

    const result = {
      chat: proposalChat[0],
      messageCount: messageCount.length > 0 ? messageCount[0].messageCount : 0,
    }

    return sendResponse(res, result)
  } catch (error) {
    next(error)
  }
}
