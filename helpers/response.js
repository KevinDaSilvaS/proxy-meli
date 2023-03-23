const createResponse = (status, body) => ({ status, body })

const commonResponses = {
    max_requests_reached: createResponse(400, {
        error: 'Given info reached max requests'
    }),
    rule_type_not_supported: createResponse(400, {
        error: 'Type informed is not supported'
    }),
    rule_type_already_exists: createResponse(400, {
        error: 'There\'s an existing rule with this type, delete existing rule first, then try again'
    }),
}

module.exports = {
    createResponse,
    commonResponses,
}