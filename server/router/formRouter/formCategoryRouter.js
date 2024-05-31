import express from 'express'
import {
  createFormCategory,
  updateFormCategory,
  getAllFormCategories,
  getFormCategoryById,
  getFormCategoryByUserId,
  deleteFormCategoryById,
} from '../../controller/formController/formCategoryController.js'
import { authMiddleware, isAdmin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createFormCategory)
router.put('/:id', authMiddleware, isAdmin, updateFormCategory)
router.get('/', getAllFormCategories)
router.get('/:id', getFormCategoryById)
router.get('/userId/:id', getFormCategoryByUserId)
router.delete('/:id', authMiddleware, isAdmin, deleteFormCategoryById)

export default router
