import express from 'express'
import {
  createForm,
  updateForm,
  deleteFormById,
  getAllForms,
  getFormById,
  getFormByUserId,
} from '../controller/formController.js'

const router = express.Router()

router.post('/', createForm)
router.put('/:id', updateForm)
router.get('/', getAllForms)
router.get('/:id', getFormById)
router.get('/userId/:id', getFormByUserId)
router.delete('/:id', deleteFormById)

export default router
