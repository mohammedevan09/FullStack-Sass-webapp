import SubscriptionServiceOrder from '../../model/orderModels/subscriptionServiceOrderModel.js'
import sendOneOrderResponse from '../../utils/sendOneOrderResponse.js'

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
    }).populate('serviceId')

    return sendOneOrderResponse(res, order)
  } catch (error) {
    next(error)
  }
}
