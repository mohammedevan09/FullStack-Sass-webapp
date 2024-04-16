import SubscriptionServiceOrder from '../../model/orderModels/subscriptionServiceOrderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createSubscriptionServiceOrder = async (req, res, next) => {
  try {
    const createOrder = await SubscriptionServiceOrder.create(req.body)

    return res.status(200).json(createOrder)
  } catch (error) {
    next(error)
  }
}

export const getSubscriptionServiceOrderById = async (req, res, next) => {
  try {
    const order = await SubscriptionServiceOrder.findById({
      _id: req.params.id,
    })
      .populate({
        path: 'formId',
        model: 'Form',
        select: 'fields',
      })
      .exec()
    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}

export const updateSubscriptionServiceOrderById = async (req, res, next) => {
  try {
    const order = await SubscriptionServiceOrder.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )

    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}

export const deleteSubscriptionServiceOrderById = async (req, res, next) => {
  try {
    const order = await SubscriptionServiceOrder.findByIdAndDelete(
      req.params.id
    )

    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}
