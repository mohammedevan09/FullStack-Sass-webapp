import express from 'express'
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  giveAccessTeam,
  loginTeam,
  removeAccessTeam,
  updateTeam,
} from '../../controller/userController/teamController.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, createTeam)
router.post('/login', loginTeam)
router.get('/all/:creatorId', getAllTeams)
router.get('/:id', getTeamById)
router.put('/access/:id', authMiddleware, giveAccessTeam)
router.put('/removeAccess/:id', authMiddleware, removeAccessTeam)
router.put('/:id', authMiddleware, updateTeam)
router.delete('/:id', authMiddleware, deleteTeam)

export default router
