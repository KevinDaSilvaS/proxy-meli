const { callApi } = require('./call-api')
const { getRule, supportedRuleTypes } = require('../rules/rules')
const { addMetric } = require('../monitoring/metrics')
const { commonResponses } = require('../../helpers/response')

const createRequestObject = req => ({
    url: 'oi',
    path: req.path,
    ip: req.ip,
    headers: req.headers,
    method: req.method,
    body: req.body
})

const proxy = async (req, repository) => {
    const reqObject = createRequestObject(req)

    const {ip, path} = supportedRuleTypes

    const ruleIp = await getRule(ip, repository)
    const ipKey = reqObject[ip]
    const reachedMaxRequestsByIp =
        await checkMaxRequests(repository, ipKey, ruleIp)

    const rulePath = await getRule(path, repository)
    const pathKey = reqObject[path]
    const reachedMaxRequestsByPath =
        await checkMaxRequests(repository, pathKey, rulePath)

    if (reachedMaxRequestsByIp) {
        await addMetric({...reqObject, max_reached: ip}, repository)
        return commonResponses.max_requests_reached
    }

    if (reachedMaxRequestsByPath) {
        await addMetric({...reqObject, max_reached: path}, repository)
        return commonResponses.max_requests_reached
    }  

    if (ruleIp) 
        await addRequestCount(repository, ipKey, ruleIp._source.expiration_every)

    if (rulePath) 
        await addRequestCount(repository, pathKey, rulePath._source.expiration_every)

    callApi(reqObject)
    await addMetric(reqObject, repository)
    return { status: 200, body: { api: 'success' } }
}

const getRequestCount = async (repository, key) => {
    const requests = await repository.cache.getCache(
        repository.cacheConn,
        key
    ) || 0

    return parseInt(requests)
}

const addRequestCount = async (repository, key, ttl) => {
    return await repository.cache.putCache(
        repository.cacheConn,
        key,
        await getRequestCount(repository, key) + 1,
        ttl
    )
}

const checkMaxRequests = async (repository, key, rule) => {
    const totalRequests = await getRequestCount(repository, key)
    if (rule && totalRequests >= rule._source.max_requests) {
        return true
    }
}

module.exports = {
    proxy
}