import FormCategory from '../../model/formModels/formCategoryModel.js'
import { sendResponse } from '../../utils/sendResponse.js'
import Form from '../../model/formModels/formModel.js'

export const createFormCategory = async (req, res, next) => {
  try {
    const form = await FormCategory.create({
      ...req.body,
      creatorId: req.user._id,
    })
    return res.status(200).json(form)
  } catch (error) {
    next(error)
  }
}

export const updateFormCategory = async (req, res, next) => {
  try {
    const update = await FormCategory.findOneAndUpdate(
      { _id: req.params.id, creatorId: req.user._id },
      { ...req.body },
      { new: true }
    )

    return sendResponse(res, update)
  } catch (error) {
    next(error)
  }
}

export const getAllFormCategories = async (req, res, next) => {
  try {
    const formCategory = await FormCategory.find().sort({ createdAt: -1 })
    return res.status(200).json(formCategory)
  } catch (error) {
    next(error)
  }
}

export const getFormCategoryById = async (req, res, next) => {
  try {
    const formCategory = await FormCategory.findById({
      _id: req.params.id,
    })
    return sendResponse(res, formCategory)
  } catch (error) {
    next(error)
  }
}

export const getFormCategoryByUserId = async (req, res, next) => {
  try {
    const formCategory = await FormCategory.find({ creatorId: req.params.id })
    return sendResponse(res, formCategory)
  } catch (error) {
    next(error)
  }
}

export const deleteFormCategoryById = async (req, res, next) => {
  try {
    const formCount = await Form.countDocuments({
      formCategoryId: req.params.id,
    })

    if (formCount > 0) {
      return res
        .status(405)
        .json({ message: 'First delete the forms inside it' })
    }

    const deletedFormCategory = await FormCategory.findOneAndDelete({
      _id: req.params.id,
      creatorId: req.user._id,
    })

    if (deletedFormCategory) {
      return sendResponse(res, { message: 'Deleted Successfully' })
    } else {
      return sendResponse(res)
    }
  } catch (error) {
    next(error)
  }
}
