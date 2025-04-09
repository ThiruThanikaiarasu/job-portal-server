import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { setResponseBody } from '../utils/responseFormatter'
import { AuthUser, JobRequestBody } from '../types/job'
import { createAJobInDB, deleteJobFromDB, fetchAllJobsFromDB, findJobByIdFromDB, findJobByTitleAndCompanyFromDB, updateJobInDB } from '../repositories/jobRepository'

interface AuthenticatedRequest extends Request {
    user?: AuthUser
}

const createAJob = async (request: AuthenticatedRequest, response: Response) => { 

    try {
        const jobData: JobRequestBody = request.body
        const user = request.user!
        const postedBy = new mongoose.Types.ObjectId(user._id)

        const existingJob = await findJobByTitleAndCompanyFromDB(jobData.title, jobData.companyName)

        if(existingJob) {
            response.status(409).send(setResponseBody("Job already exist", "job_exists", null))
            return 
        }

        const savedJob = await createAJobInDB({ ...jobData, postedBy })

        response.status(201).send(setResponseBody("Job added Successfully", null, savedJob))
    }
    catch(error) {
        if(error instanceof Error) {
            response.status(500).send(setResponseBody(error.message, 'server_error', null))
        }
        
        response.status(500).send(setResponseBody(String(error), 'server_error', null))
    }
}

const getAllJobs = async (request: Request, response: Response) => {
    try {
        const jobs = await fetchAllJobsFromDB()

        response.status(200).send(setResponseBody("Jobs fetched", null, jobs))
    }
    catch(error) {
        if(error instanceof Error) {
            response.status(500).send(setResponseBody(error.message, 'server_error', null))
        }
        
        response.status(500).send(setResponseBody(String(error), 'server_error', null))
    }
}

const updateJob = async (request: AuthenticatedRequest, response: Response) => {
    try {
        console.log(request.user)
        const jobId = request.params.id
        const user = request.user!
        const updateData: Partial<JobRequestBody> = request.body
        console.log(updateData)
        delete (updateData as any)._id

        const job = await findJobByIdFromDB(jobId)

        if (!job) {
            response.status(404).send(setResponseBody("Job not found", "job_not_found", null))
            return
        }

        if (job.postedBy.toString() !== user._id) {
            response.status(403).send(setResponseBody("Unauthorized to update this job", "unauthorized", null))
            return
        }

        console.log(updateData)
const updatedJob = await updateJobInDB(jobId, updateData)
console.log(updatedJob)

        response.status(200).send(setResponseBody("Job updated successfully", null, updatedJob))
    }
    catch (error) {
        console.log(error)
        if (error instanceof Error) {
            response.status(500).send(setResponseBody(error.message, 'server_error', null))
        } else {
            response.status(500).send(setResponseBody(String(error), 'server_error', null))
        }
    }
}

const deleteJob = async (request: AuthenticatedRequest, response: Response) => {
    try {
        const jobId = request.params.id
        const user = request.user!

        const job = await findJobByIdFromDB(jobId)

        if (!job) {
            response.status(404).send(setResponseBody("Job not found", "job_not_found", null))
            return
        }

        if (job.postedBy.toString() !== user._id) {
            response.status(403).send(setResponseBody("Unauthorized to delete this job", "unauthorized", null))
            return
        }

        await deleteJobFromDB(jobId)

        response.status(200).send(setResponseBody("Job deleted successfully", null, null))
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).send(setResponseBody(error.message, 'server_error', null))
        } else {
            response.status(500).send(setResponseBody(String(error), 'server_error', null))
        }
    }
}

export {
    createAJob,
    getAllJobs,
    updateJob,
    deleteJob
}