import mongoose, { Types } from 'mongoose'
import {
  emailNotification,
  notificationTypes,
} from '../../utils/sendNotificationEmail.js'
import { sendResponse } from '../../utils/sendResponse.js'
import Notification from '../../model/notificationModels/notificationModel.js'
import UserSetting from '../../model/userModels/userSettingModel.js'

export const createNotification = async (notificationData) => {
  try {
    await Notification.create(notificationData)

    const user = await UserSetting.findOneAndUpdate(
      { userId: notificationData.userId },
      { userId: notificationData.userId },
      { upsert: true, new: true }
    ).populate({
      path: 'userId',
      model: 'User',
      select: 'fullName email _id',
    })

    const { to, title, content } = notificationData
    if (user && user?.emailNotification?.[to]) {
      const subject = `New Notification - ${title}`
      const template = notificationTypes.find(
        (type) => type.type === to
      )?.template

      if (template) {
        const html = template(user?.userId?.fullName, title, content)
        await emailNotification(user?.userId?.email, subject, html)
      }
    }
  } catch (error) {}
}

export const updateNotification = async (notificationData) => {
  try {
    await Notification.updateOne(
      { id: notificationData?.id },
      { $set: { ...notificationData, read: false, readByAdmin: false } }
    )

    const user = await UserSetting.findOneAndUpdate(
      { userId: notificationData.userId },
      { userId: notificationData.userId },
      { upsert: true, new: true }
    ).populate({
      path: 'userId',
      model: 'User',
      select: 'fullName email _id',
    })

    const { to, title, content } = notificationData
    if (user && user?.emailNotification?.[to]) {
      const subject = `New Notification - ${title}`
      const template = notificationTypes.find(
        (type) => type.type === to
      )?.template

      if (template) {
        const html = template(user?.userId?.fullName, title, content)
        await emailNotification(user?.userId?.email, subject, html)
      }
    }
  } catch (error) {}
}

export const getAllNotification = async (req, res, next) => {
  try {
    let query = {}
    const { page = 1, limit = 10, search = '' } = req.query

    if (
      req.query.userId &&
      (req.query.role === 'user' || req.query.role === 'userMember')
    ) {
      query.userId = new Types.ObjectId(req.query.userId)
    }

    const pipeline = [
      {
        $match: {
          ...query,
          type: { $ne: 'Chat' },
          $or: [
            { title: { $regex: new RegExp(search), $options: 'i' } },
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
          totalCount: [
            { $match: { type: { $ne: 'Chat' } } },
            { $count: 'total' },
          ],
          unreadCount: [{ $match: { read: false } }, { $count: 'unread' }],
          unreadByAdminCount: [
            { $match: { readByAdmin: false } },
            { $count: 'unreadByAdmin' },
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
          unreadCount: { $arrayElemAt: ['$unreadCount.unread', 0] },
          unreadByAdminCount: {
            $arrayElemAt: ['$unreadByAdminCount.unreadByAdmin', 0],
          },
          notifications: 1,
        },
      },
    ]

    const result = await Notification.aggregate(pipeline)

    const notifications = result[0].notifications
    const totalCount = result[0].totalCount
    const unreadCount = result[0].unreadCount
    const unreadByAdminCount = result[0].unreadByAdminCount

    const populatedNotifications = await Promise.all(
      notifications.map(async (notification) => {
        let refCollection
        switch (notification.type) {
          case 'Order':
            refCollection = 'orders'
            break
          case 'Proposal':
            refCollection = 'proposals'
            break
          case 'Ticket':
            refCollection = 'tickets'
            break
          case 'Invoice':
            refCollection = 'invoices'
            break
          case 'Meeting':
            refCollection = 'meetings'
            break
          case 'Affiliate':
            refCollection = 'affiliates'
            break
          case 'User':
            refCollection = 'users'
            break
          case 'Team':
            refCollection = 'teams'
            break
          default:
            refCollection = null
        }

        if (refCollection) {
          const populatedData = await mongoose.connection
            .collection(refCollection)
            .findOne(
              { _id: notification.id },
              { projection: { __t: 1, _id: 1, createdAt: 1, updatedAt: 1 } }
            )

          return { ...notification, idDetails: populatedData }
        }
        return notification
      })
    )

    const response = {
      notifications: populatedNotifications,
      totalDocsCount: totalCount,
      unreadCount: unreadCount,
      unreadByAdminCount: unreadByAdminCount,
    }

    return sendResponse(res, response)
  } catch (error) {
    next(error)
  }
}

export const updateOneNotification = async (req, res, next) => {
  try {
    const data = await Notification.findByIdAndUpdate(
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

export const updateManyNotification = async (req, res, next) => {
  try {
    const { filter, updateData } = req.body
    await Notification.updateMany(filter, updateData, {
      new: true,
    })

    return sendResponse(res, { message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

export const deleteNotification = async (req, res, next) => {
  try {
    const data = await Notification.findByIdAndDelete({ _id: req.params.id })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
