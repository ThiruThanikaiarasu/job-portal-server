import mongoose from "mongoose"
import Job from "../models/jobModel"
import { JobRequestBody } from "../types/job"

const findJobByTitleAndCompanyFromDB = (title: string, companyName: string) => {
    return Job.findOne({ title, companyName })
}

const findJobByIdFromDB = (id: string) => {
    return Job.findOne({ _id: id })
}

const createAJobInDB = async (
    data: JobRequestBody & { postedBy: mongoose.Types.ObjectId }
) => {
    const newJob = new Job(data)
    const savedJob = await newJob.save()
    return savedJob
}

const fetchAllJobsFromDB = async () => {
    return Job.find()
}

const updateJobInDB = (jobId: string, updateData: Partial<JobRequestBody>) => {
    return Job.findByIdAndUpdate(jobId, updateData, { new: true })
}

const deleteJobFromDB = async (jobId: string) => {
    return Job.findByIdAndDelete(jobId)
}

export {
    findJobByTitleAndCompanyFromDB,
    findJobByIdFromDB,
    createAJobInDB,
    fetchAllJobsFromDB,
    updateJobInDB,
    deleteJobFromDB
}