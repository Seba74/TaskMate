type ErrorAxiosRes = {
    name: string,
    message: string
}

export const AxiosAdapterError = (error: any): ErrorAxiosRes[] => {
    return error.response.data.response.errors
}