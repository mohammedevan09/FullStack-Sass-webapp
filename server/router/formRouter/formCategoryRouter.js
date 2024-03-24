import express from 'express'
import {
  createFormCategory,
  updateFormCategory,
  getAllFormCategories,
  getFormCategoryById,
  getFormCategoryByUserId,
  deleteFormCategoryById,
} from '../../controller/formController/formCategoryController.js'

const router = express.Router()

router.post('/', createFormCategory)
router.put('/:id', updateFormCategory)
router.get('/', getAllFormCategories)
router.get('/:id', getFormCategoryById)
router.get('/userId/:id', getFormCategoryByUserId)
router.delete('/:id', deleteFormCategoryById)

export default router
