import Affiliate from '../model/affiliateModel.js'
import User from '../model/userModels/userModel.js'
import Order from '../model/orderModels/orderModel.js'
import { sendResponse } from '../utils/sendResponse.js'
import mongoose from 'mongoose'

export const createAffiliate = async (req, res, next) => {
  try {
    const data = await Affiliate.create(req.body)

    return res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const getAllAffiliates = async (req, res, next) => {
  try {
    const affiliates = await Affiliate.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          userId: 1,
          fullName: '$user.fullName',
          paidEarnings: 1,
          paymentAccounts: 1,
          __v: 1,
          visitorsCount: { $size: '$visitors' },
        },
      },
    ])

    const affiliatesWithStats = await Promise.all(
      affiliates.map(async (affiliate) => {
        const referredUsers = await User.find({
          referredBy: affiliate.userId.toString(),
        }).select('_id')

        const referredUserIds = referredUsers.map((user) => user._id)

        const orders = await Order.aggregate([
          {
            $match: {
              userId: { $in: referredUserIds },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
          {
            $project: {
              _id: 1,
              userId: '$userId',
              totalAmount: 1,
            },
          },
        ])

        let totalEarnings = 0
        for (const user of referredUsers) {
          const userOrders = orders.filter((order) =>
            order.userId.equals(user._id)
          )
          const totalSpend = userOrders.reduce(
            (total, order) => total + order.totalAmount,
            0
          )
          totalEarnings += totalSpend
        }

        return {
          ...affiliate,
          signUps: referredUsers.length,
          totalEarnings: totalEarnings / 10,
        }
      })
    )

    return sendResponse(res, affiliatesWithStats)
  } catch (error) {
    next(error)
  }
}

export const getAffiliateByUserId = async (req, res, next) => {
  try {
    const affiliate = await Affiliate.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.params.userId),
        },
      },
      {
        $project: {
          userId: 1,
          paidEarnings: 1,
          paymentAccounts: 1,
          __v: 1,
          visitorsCount: { $size: '$visitors' },
        },
      },
    ])

    const referredUsers = await User.find({
      referredBy: req.params.userId,
    }).select('fullName _id')

    const referredUserIds = referredUsers.map((user) => user._id)

    const orders = await Order.aggregate([
      {
        $match: {
          userId: { $in: referredUserIds },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 1,
          title: 1,
          createdAt: 1,
          userId: '$userId',
          totalAmount: 1,
          fullName: '$user.fullName',
        },
      },
    ])

    const referredUsersInfo = []
    for (const user of referredUsers) {
      const userOrders = orders.filter((order) => order.userId.equals(user._id))
      const totalProjects = userOrders.length
      const totalSpend = userOrders.reduce(
        (total, order) => total + order.totalAmount,
        0
      )
      referredUsersInfo.push({
        _id: user._id,
        fullName: user.fullName,
        totalProjects,
        totalSpend,
      })
    }

    const totalEarnings = referredUsersInfo?.reduce((acc, curr) => {
      acc += curr?.totalSpend
      return acc
    }, 0)

    const response = {
      orders,
      referredUsers: referredUsersInfo,
      affiliate: {
        ...affiliate[0],
        signUps: referredUsers.length,
        totalEarnings: totalEarnings / 10,
      },
    }

    return sendResponse(res, response)
  } catch (error) {
    next(error)
  }
}

export const updateAffiliate = async (req, res, next) => {
  try {
    const data = await Affiliate.findByIdAndUpdate(
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

export const addAffiliateVisitors = async (req, res, next) => {
  const { userId, visitorId } = req.body

  try {
    const affiliate = await Affiliate.findOne({ userId: userId })

    if (!affiliate) {
      return res.status(404).json({ message: 'Affiliate not found' })
    }

    if (affiliate.visitors.some((visitor) => visitor.visitorId === visitorId)) {
      return res.status(204).json({ message: 'Visitor already exists' })
    }

    affiliate.visitors.push({ visitorId: visitorId })

    await affiliate.save()

    return sendResponse(res, affiliate)
  } catch (error) {
    next(error)
  }
}

export const deleteAffiliate = async (req, res, next) => {
  try {
    const data = await Affiliate.findByIdAndDelete({ _id: req.params.id })

    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
