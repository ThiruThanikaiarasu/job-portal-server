import mongoose, { Schema, Document } from 'mongoose'

export interface IJob extends Document {
    title: string
    companyName: string
    location: string
    jobType: string
    salaryMin: string
    salaryMax: string
    applicationDeadline: Date
    description: string
    postedBy: mongoose.Types.ObjectId
}

const amountRegex = /^(?:\d{1,2}|\d{2})(?:\.\d{1,2})?$/

const JobSchema: Schema<IJob> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
            minLength: [2, 'Job title must be at least 2 characters'],
            maxLength: [100, 'Job title must be no longer than 100 characters'],
        },
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
            minLength: [2, 'Company name must be at least 2 characters'],
            maxLength: [100, 'Company name must be no longer than 100 characters'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        jobType: {
            type: String,
            required: [true, 'Job type is required'],
            enum: ['Full Time', 'Part Time', 'Internship', 'Contract'],
        },
        salaryMin: {
            type: String,
            required: [true, 'Minimum salary is required'],
            match: [amountRegex, 'Invalid minimum salary format'],
        },
        salaryMax: {
            type: String,
            required: [true, 'Maximum salary is required'],
            match: [amountRegex, 'Invalid maximum salary format'],
            validate: {
                validator: function (this: any, value: string) {
                    const min = parseFloat(this.salaryMin)
                    const max = parseFloat(value)
                    return max > min
                },
                message: 'Maximum salary must be greater than minimum salary',
            }
        },
        applicationDeadline: {
            type: Date,
            required: [true, 'Application deadline is required'],
            validate: {
                validator: function (value: Date) {
                    return value > new Date()
                },
                message: 'Application deadline must be a future date',
            },
        },
        description: {
            type: String,
            required: [true, 'Job description is required'],
            trim: true,
            minLength: [20, 'Job description must be at least 20 characters'],
            maxLength: [2000, 'Job description must be no longer than 2000 characters'],
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'jobs'
    }
)

const Job = mongoose.models.jobs || mongoose.model<IJob>('jobs', JobSchema)
export default Job 