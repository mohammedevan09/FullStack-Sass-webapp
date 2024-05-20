import express from 'express'
import { searchAllCollections } from '../controller/dashboardController.js'
import { teamMiddleware } from '../middleware/teamMiddleware.js'

const router = express.Router()

router.get('/', teamMiddleware, searchAllCollections)

export default router
