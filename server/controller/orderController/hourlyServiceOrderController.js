import HourlyServiceOrder from '../../model/orderModels/hourlyServiceOrderModel.js'
import sendOneOrderResponse from '../../utils/sendOneOrderResponse.js'

export const createHourlyServiceOrder = async (req, res, next) => {
  try {
    const createOrder = await HourlyServiceOrder.create(req.body)

    return res.status(200).json(createOrder)
  } catch (error) {
    next(error)
  }
}

export const getHourlyServiceOrderById = async (req, res, next) => {
  try {
    const order = await HourlyServiceOrder.findById({
      _id: req.params.id,
    }).populate('serviceId')

    return sendOneOrderResponse(res, order)
  } catch (error) {
    next(error)
  }
}
