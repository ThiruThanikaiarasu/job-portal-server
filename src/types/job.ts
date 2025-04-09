interface JobRequestBody {
    title: string
    companyName: string
    location: string
    jobType: string
    salaryMin: string
    salaryMax: string
    applicationDeadline: string
    description: string
}

interface AuthUser {
    _id: string
    email: string
    role: 'user' | 'admin'
}

export {
    JobRequestBody,
    AuthUser
}