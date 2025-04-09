import express from 'express'
const router = express.Router()

import validateRequest from '../middleware/validateRequest'
import { jobSchema } from '../validators/jobValidator'
import { createAJob, deleteJob, getAllJobs, updateJob } from '../controllers/jobController'
import { verifyUser } from '../middleware/authMiddleware'

router.post(
    '/',

    verifyUser,

    validateRequest(jobSchema),

    createAJob
)

router.put(
    '/:id',

    verifyUser,

    updateJob
)

router.delete(
    '/:id',

    verifyUser,

    deleteJob
)

router.get(
    '/',

    getAllJobs
)


export default router