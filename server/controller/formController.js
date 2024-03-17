import Form from '../model/formModel.js'
import { sendResponse } from '../utils/sendResponse.js'

export const createForm = async (req, res, next) => {
  try {
    const form = await Form.create(req.body)
    return res.status(200).json(form)
  } catch (error) {
    next(error)
  }
}

export const updateForm = async (req, res, next) => {
  try {
    const update = await Form.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )

    return sendResponse(res, update)
  } catch (error) {
    next(error)
  }
}

export const getAllForms = async (req, res, next) => {
  try {
    const services = await Form.find()
    return res.status(200).json(services)
  } catch (error) {
    next(error)
  }
}

export const getFormById = async (req, res, next) => {
  try {
    const services = await Form.findById({ _id: req.params.id })
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const getFormByUserId = async (req, res, next) => {
  try {
    const services = await Form.find({ userId: req.params.id })
    return sendResponse(res, services)
  } catch (error) {
    next(error)
  }
}

export const deleteFormById = async (req, res, next) => {
  try {
    const deletedService = await Form.findByIdAndDelete({
      _id: req.params.id,
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
