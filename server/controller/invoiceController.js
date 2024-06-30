import dotenv from 'dotenv'
dotenv.config()

import Stripe from 'stripe'
import { Types } from 'mongoose'
import Order from '../model/orderModels/orderModel.js'
import Proposal from '../model/proposalsModels/proposalsModel.js'
import { sendResponse } from '../utils/sendResponse.js'

const stripe = Stripe(process.env.SECURITY_KEY)

const clientURL = process.env.BASE_URL

export const getAllInvoices = async (req, res, next) => {
  try {
    const {
      status,
      userId,
      role,
      access,
      page = 1,
      limit = 10,
      search = '',
    } = req.query

    const query = {
      ...(status && { status }),
      ...(userId &&
        (role === 'user' || role === 'userMember') && {
          userId: new Types.ObjectId(userId),
        }),
    }

    const accessOf = access?.orders?.accessOf || []
    const halfLimit = Math.ceil(parseInt(limit) / 2)
    const skip = (parseInt(page) - 1) * parseInt(halfLimit)

    const commonMatchStage = {
      ...query,
      $or: [
        { title: { $regex: new RegExp(search, 'i') } },
        {
          _id: Types.ObjectId.isValid(search)
            ? new Types.ObjectId(search)
            : null,
        },
      ],
    }

    if (access) {
      commonMatchStage._id = { $in: accessOf }
    }

    const orderPipeline = [
      {
        $match: {
          ...commonMatchStage,
          $and: [
            {
              $or: [
                { __t: { $ne: 'SubscriptionServiceOrder' } },
                {
                  __t: 'SubscriptionServiceOrder',
                  payment_status: { $ne: 'pending' },
                },
              ],
            },
          ],
        },
      },
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(halfLimit) },
      {
        $project: {
          _id: 1,
          title: 1,
          updatedAt: 1,
          totalAmount: 1,
          payment_status: 1,
          status: 1,
          type: 'Order',
        },
      },
    ]

    const proposalMatchStage = {
      ...commonMatchStage,
      'details.isAccepted': { $ne: false },
    }

    const proposalPipeline = [
      { $match: proposalMatchStage },
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(halfLimit) },
      {
        $project: {
          _id: 1,
          title: 1,
          updatedAt: 1,
          totalAmount: 1,
          payment_status: 1,
          status: 1,
          type: 'Proposal',
        },
      },
    ]

    const [orders, proposals, orderCount, proposalCount] = await Promise.all([
      Order.aggregate(orderPipeline),
      Proposal.aggregate(proposalPipeline),
      Order.countDocuments(commonMatchStage),
      Proposal.countDocuments(proposalMatchStage),
    ])

    const combinedResults = [...orders, ...proposals].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )

    return res.status(200).json({
      results: combinedResults,
      page,
      limit,
      totalDocsCount: orderCount + proposalCount,
    })
  } catch (error) {
    next(error)
  }
}

export const payNowOrderOrProposal = async (req, res, next) => {
  try {
    let order
    let customer
    let line_items

    if (req.body.type === 'Order') {
      order = await Order.findById(req.params.id)
        .populate({
          path: 'serviceId',
          model: 'Service',
          select: '_id name heading icon',
        })
        .exec()

      customer = await stripe.customers.create({
        metadata: {
          orderId: order._id.toString(),
        },
      })

      line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: order?.serviceId?.name,
              description: order?.serviceId?.heading,
            },
            unit_amount: order?.totalAmount * 100,
          },
          quantity: 1,
        },
      ]
    } else {
      order = await Proposal.findById(req.params.id)

      customer = await stripe.customers.create({
        metadata: {
          proposalId: order._id.toString(),
        },
      })

      line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: order?.title,
              description: order?.description,
            },
            unit_amount: order?.totalAmount * 100,
          },
          quantity: 1,
        },
      ]
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${clientURL}/dashboard/invoice?userId=${req.user?._id}`,
      cancel_url: `${clientURL}/dashboard/invoice?userId=${req.user?._id}`,
    })

    return res.status(200).json({ ...order._doc, url: session?.url })
  } catch (error) {
    next(error)
  }
}

const modelMapping = {
  Order: Order,
  Proposal: Proposal,
}

export const getInvoice = async (req, res, next) => {
  try {
    const { type } = req.query

    const Model = modelMapping[type]
    if (!Model) {
      return res.status(400).json({ message: 'Invalid type specified' })
    }

    let query = Model.findOne({ _id: req.params.id })
      .select('-hourlyTimeLogs -projectTrackingBoard')
      .populate({
        path: 'userId',
        model: 'User',
        select: 'fullName email _id number',
      })

    if (type === 'Order') {
      query = query.populate({
        path: 'serviceId',
        model: 'Service',
        select: 'name icon heading',
      })
    }

    const invoice = await query

    if (
      invoice?.__t === 'SubscriptionServiceOrder' &&
      invoice?.payment_status === 'pending'
    ) {
      return res.status(493).json({ message: 'Subscription is unpaid' })
    } else {
      return sendResponse(res, invoice)
    }
  } catch (error) {
    next(error)
  }
}
