
export interface ErrorInfo{
    message: string,
    errors: Array<unknown>
}

export interface ResponseInfo{
    data: ErrorInfo,
    status: number,
    statusText: string
}

export interface ErrorMessage{
    message: string,
    response: ResponseInfo
}