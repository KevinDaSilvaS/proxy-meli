const { commonResponses } = require('../../helpers/response')

const supportedRuleTypes = {
    ip: "ip",
    path: "path"
}

const index = "rules"

const getRule = async (type, repository) => {
    return await repository.db.getOneSearch({type}, index, repository.dbConn)
}

const addRule = async (rule, repository) => {    
    const { type } = rule

    const supportedType = supportedRuleTypes[type]

    if (!supportedType) {
        return commonResponses.rule_type_not_supported
    }

    const existingRule = await getRule(type, repository)
    if (existingRule) {
        return commonResponses.rule_type_already_exists
    }

    const createdRule = await repository.db.create(
        rule, 
        index, 
        repository.dbConn)

    return { status: 201, body: createdRule } 
}

const removeRule = async (type, repository) => {
    await repository.db.remove({type}, index, repository.dbConn)
    return { status: 204, body: {} }
}

module.exports = {
    getRule,
    removeRule,
    addRule,
    supportedRuleTypes
}