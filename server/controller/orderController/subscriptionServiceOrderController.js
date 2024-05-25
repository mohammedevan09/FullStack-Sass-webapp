import OrderChat from '../../model/orderModels/orderChatModel.js'
import SubscriptionServiceOrder from '../../model/orderModels/subscriptionServiceOrderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import { createNotification } from '../notificationController/notificationController.js'

export const createSubscriptionServiceOrder = async (req, res, next) => {
  try {
    const createOrder = await SubscriptionServiceOrder.create({
      ...req.body,
      userId: req.user?._id,
    })

    await createNotification({
      content: createOrder?.description,
      title: createOrder?.title,
      type: 'Order',
      to: 'subscription',
      id: createOrder?._id,
      userId: createOrder.userId,
    })

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
      .populate({
        path: 'serviceId',
        model: 'Service',
      })
      .exec()
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

    await OrderChat.deleteOne({
      orderId: data?._id,
    })

    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}
