const axios = require('axios')
const { createResponse } = require('../../helpers/response')

const callApi = async requestObject => {
    const { url, path, headers, method, body, query } = requestObject
    const queryStr = buildQuery(query)
    const apiUrl = `${url}${path}?${queryStr}`

    try {
        const res = await axios({
            method: method.toLowerCase(),
            url: apiUrl,
            data: { ...body },
            headers: sanitizeHeaders(headers)
        })

        return createResponse(200, res.data, res.headers)
    } catch (error) {
        return createResponse(500, { error: error.message })
    }
}

const buildQuery = query => Object.keys(query)
    .reduce((acc, key) => `${acc}&${key}=${query[key]}`, ``)

const sanitizeHeaders = headers => {
    ["host", "cookie", "accept"].map(key => delete headers[key])
    return headers
}

module.exports = {
    callApi
}