import express from 'express'
import {
  createForm,
  updateForm,
  deleteFormById,
  getAllForms,
  getFormById,
  getFormByUserId,
} from '../../controller/formController/formController.js'
import { authMiddleware, isAdmin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createForm)
router.put('/:id', authMiddleware, isAdmin, updateForm)
router.get('/', getAllForms)
router.get('/:id', getFormById)
router.get('/userId/:id', getFormByUserId)
router.delete('/:id', authMiddleware, isAdmin, deleteFormById)

export default router
