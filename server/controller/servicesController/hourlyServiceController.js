import HourlyService from '../../model/serviceModels/hourlyServiceModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createHourlyService = async (req, res, next) => {
  try {
    const newHourlyService = await HourlyService.create({
      ...req.body,
      creatorId: req.user?._id,
    })
    return res.status(200).json(newHourlyService)
  } catch (error) {
    next(error)
  }
}

export const updateHourlyService = async (req, res, next) => {
  try {
    const update = await HourlyService.findOneAndUpdate(
      { _id: req.params.id, creatorId: req.user?._id },
      { $set: { ...req.body } },
      { new: true }
    ).populate('form')
    return sendResponse(res, update)
  } catch (error) {
    next(error)
  }
}

export const getAllHourlyServices = async (req, res, next) => {
  try {
    const services = await HourlyService.find()
    return res.status(200).json(services)
  } catch (error) {
    next(error)
  }
}

export const getHourlyServiceById = async (req, res, next) => {
  try {
    const services = await HourlyService.findById({
      _id: req.params.id,
    }).populate('form')
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const getHourlyServiceByUserId = async (req, res, next) => {
  try {
    const services = await HourlyService.find({
      creatorId: req.params.id,
    }).populate('form')
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const deleteHourlyServiceById = async (req, res, next) => {
  try {
    const deletedService = await HourlyService.findOneAndDelete({
      _id: req.params.id,
      creatorId: req.user?._id,
    })

    if (deletedService) {
      return sendResponse(res, { message: 'Deleted Successfully' })
    } else {
      return sendResponse(res)
    }
  } catch (error) {
    next(error)
  }
}
