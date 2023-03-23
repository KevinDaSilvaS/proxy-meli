const axios = require('axios')
const { createResponse } = require('../../helpers/response')

const callApi = async requestObject => {
    const { url, path, headers, method, body } = requestObject

    try {
        const res = await axios({
            method: method.toLowerCase(),
            url: `${url}${path}`,
            data: { ...body },
            headers
        })

        return createResponse(200, res.data, res.headers)
    } catch (error) {
        return createResponse(500, { error: error.message })
    }
}

module.exports = {
    callApi
}