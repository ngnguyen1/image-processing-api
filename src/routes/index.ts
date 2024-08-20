import express, { Router } from 'express'
import validateParams from '../middleware/validateParams'
import images from './api/images'

const router: Router = express.Router()

// Define your routes here
router.use('/images', validateParams, images)

export default router
