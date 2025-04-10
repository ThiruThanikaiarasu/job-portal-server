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

interface JobFilters {
    searchQuery: string
    location: string
    jobType: string
    minSalary: number
    maxSalary: number
}

const fetchAllJobsFromDB = async (filters: JobFilters) => {
    const { searchQuery, location, jobType, minSalary, maxSalary } = filters

    let query: any= { }

    query.$and = [
        { salaryMin: { $lte: maxSalary } },
        { salaryMax: { $gte: minSalary } }  
      ]      
    

    if (searchQuery) {
        query.title = { $regex: searchQuery, $options: 'i' }  
    }

    if (location) {
        query.location = { $regex: location, $options: 'i' }
    }

    if (jobType) {
        query.jobType = jobType
    }
    
    return Job.find(query)
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