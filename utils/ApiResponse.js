export const apiResponse = (response) => {
    // console.log(response)
    return response.data !== null ?
        {
            ok: response.status >= 200 && response.status < 300,
            status: response.status,
            statusText: response.statusText,
            data: response.data,
        } :
        {
            ok: false,
            status: response.status,
            statusText: response.response.statusText,
            data: null,
        }
}