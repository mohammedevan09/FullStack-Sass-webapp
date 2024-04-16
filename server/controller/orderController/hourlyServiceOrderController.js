import HourlyServiceOrder from '../../model/orderModels/hourlyServiceOrderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

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

export const updateHourlyServiceOrderById = async (req, res, next) => {
  try {
    const order = await HourlyServiceOrder.findByIdAndUpdate(
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

export const deleteHourlyServiceOrderById = async (req, res, next) => {
  try {
    const order = await HourlyServiceOrder.findByIdAndDelete(req.params.id)

    return sendResponse(res, order)
  } catch (error) {
    next(error)
  }
}
