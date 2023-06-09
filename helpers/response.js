const createResponse = (status, body, headers = {}) => ({ 
    status, 
    body, 
    headers 
})

const commonResponses = {
    max_requests_reached: createResponse(429, {
        error: 'Given endpoint reached max requests by defined rule'
    }),
    rule_type_not_supported: createResponse(400, {
        error: 'Type informed is not supported'
    }),
    rule_type_already_exists: createResponse(409, {
        error: 'There\'s an existing rule with this type, delete existing rule first, then try again'
    }),
}

module.exports = {
    createResponse,
    commonResponses,
}