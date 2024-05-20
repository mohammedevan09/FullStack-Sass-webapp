import mongoose, { Types } from 'mongoose'
import MessageNotification from '../../model/notificationModels/messageNotificationModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const findOrCreateChatNotification = async (req, res, next) => {
  try {
    const updatedReceivers = req.body.receivers?.map((receiver) => ({
      ...receiver,
      read: false,
    }))

    let data = await MessageNotification.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, receivers: updatedReceivers },
      { upsert: true, new: true }
    )

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const getAllMessageNotification = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', userId } = req.query

    if (!userId) {
      return res.status(400).send({ message: 'userId is required' })
    }

    const objectIdUserId = new Types.ObjectId(userId)

    const pipeline = [
      {
        $match: {
          'sender.senderId': { $ne: objectIdUserId },
          $or: [
            { content: { $regex: new RegExp(search), $options: 'i' } },
            {
              id: Types.ObjectId.isValid(search)
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
        $facet: {
          totalCount: [{ $count: 'total' }],
          unreadCount: [
            { $unwind: '$receivers' },
            {
              $match: {
                'receivers.userId': objectIdUserId,
                'receivers.read': false,
              },
            },
            { $count: 'unread' },
          ],
          notifications: [
            { $sort: { createdAt: -1 } },
            { $skip: (parseInt(page) - 1) * parseInt(limit) },
            { $limit: parseInt(limit) },
          ],
        },
      },
      {
        $project: {
          totalCount: { $arrayElemAt: ['$totalCount.total', 0] },
          unreadCount: {
            $ifNull: [{ $arrayElemAt: ['$unreadCount.unread', 0] }, 0],
          },
          notifications: {
            $map: {
              input: '$notifications',
              as: 'notification',
              in: {
                _id: '$$notification._id',
                id: '$$notification.id',
                content: '$$notification.content',
                createdAt: '$$notification.createdAt',
                idDetails: '$$notification.idDetails',
                title: '$$notification.title',
                type: '$$notification.type',
                updatedAt: '$$notification.updatedAt',
                receivers: {
                  $filter: {
                    input: '$$notification.receivers',
                    as: 'receiver',
                    cond: { $eq: ['$$receiver.userId', objectIdUserId] },
                  },
                },
              },
            },
          },
        },
      },
    ]

    const result = await MessageNotification.aggregate(pipeline)

    const notifications = result[0].notifications || []
    const totalCount = result[0].totalCount || 0
    const unreadCount = result[0].unreadCount || 0

    const response = {
      notifications: notifications,
      totalDocsCount: totalCount,
      unreadCount: unreadCount,
    }

    return sendResponse(res, response)
  } catch (error) {
    next(error)
  }
}

export const readMessageNotification = async (req, res, next) => {
  try {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).send({ message: 'userId is required' })
    }

    const objectIdUserId = new mongoose.Types.ObjectId(userId)

    const data = await MessageNotification.findOneAndUpdate(
      { id: req.params.id, 'receivers.userId': objectIdUserId },
      { $set: { 'receivers.$.read': true } },
      { new: true }
    )

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const readAllMessageNotification = async (req, res, next) => {
  try {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).send({ message: 'userId is required' })
    }

    console.log(userId)
    const objectIdUserId = new Types.ObjectId(userId)

    console.log(objectIdUserId)

    await MessageNotification.updateMany(
      { 'receivers.userId': objectIdUserId },
      {
        $set: {
          'receivers.$[elem].read': true,
        },
      },
      {
        arrayFilters: [{ 'elem.userId': objectIdUserId }],
        new: true,
      }
    )

    return res.status(200).send({ message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

export const deleteMessageNotification = async (req, res, next) => {
  try {
    const data = await MessageNotification.findByIdAndDelete({
      _id: req.params.id,
    })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
