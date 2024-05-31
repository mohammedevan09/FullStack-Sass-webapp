import Form from '../../model/formModels/formModel.js'
import Service from '../../model/serviceModels/serviceModel.js'
import Order from '../../model/orderModels/orderModel.js'
import { sendResponse } from '../../utils/sendResponse.js'

export const createForm = async (req, res, next) => {
  try {
    const form = await Form.create({ ...req.body, userId: req.user._id })
    return res.status(200).json(form)
  } catch (error) {
    next(error)
  }
}

export const updateForm = async (req, res, next) => {
  try {
    const update = await Form.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
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
    let { page = 1, limit = 10, categoryId } = req.query
    page = parseInt(page)
    limit = parseInt(limit)

    let query = {}

    if (categoryId) {
      query.formCategoryId = categoryId
    }

    const forms = await Form.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    const totalDocsCount = await Form.countDocuments(query)
    const response = {
      forms,
      totalDocsCount,
    }

    return sendResponse(res, response)
  } catch (error) {
    next(error)
  }
}

export const getFormById = async (req, res, next) => {
  try {
    const form = await Form.findById({ _id: req.params.id })
    return sendResponse(res, form)
  } catch (error) {
    next(error)
  }
}

export const getFormByUserId = async (req, res, next) => {
  try {
    const form = await Form.find({ userId: req.params.id })
    return sendResponse(res, form)
  } catch (error) {
    next(error)
  }
}

export const deleteFormById = async (req, res, next) => {
  try {
    const [serviceFormCount, orderFormCount] = await Promise.all([
      Service.countDocuments({ form: req.params.id }),
      Order.countDocuments({ formId: req.params.id }),
    ])

    if (serviceFormCount > 0 || orderFormCount > 0) {
      return res.status(405).json({ message: 'This form is in use.' })
    }

    const deletedForm = await Form.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    })

    if (deletedForm) {
      return sendResponse(res, { message: 'Deleted Successfully' })
    } else {
      return sendResponse(res)
    }
  } catch (error) {
    next(error)
  }
}
