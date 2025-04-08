interface ResponseBody<T> {
    message: string
    error: string | null
    data: T | null
}
  
const setResponseBody = <T>(message: string, error: string | null, data: T | null): ResponseBody<T> => {
    return {
        message,
        error,
        data,
    }
}

export {
    setResponseBody
}
  