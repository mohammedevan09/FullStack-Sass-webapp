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

const router = express.Router()

router.post('/', createTeam)
router.post('/login', loginTeam)
router.get('/all/:creatorId', getAllTeams)
router.get('/:id', getTeamById)
router.put('/access/:id', giveAccessTeam)
router.put('/removeAccess/:id', removeAccessTeam)
router.put('/:id', updateTeam)
router.delete('/:id', deleteTeam)

export default router
