const index = "metrics"

const addMetric = async (metric, repository) => {
    return await repository.db.create(metric, index, repository.dbConn)
}

const getMetrics = (filters, repository) => {
    return {
        status: 200,
        body: [
            {ip: "123", path: "abc/"},
            {ip: "123", path: "abc/"},
            {ip: "123", path: "abc/"},
            {ip: "123", path: "abc/"},
            {ip: "123", path: "abc/"},
            {ip: "123", path: "abc/"},
        ]
    }
}

module.exports = {
    getMetrics,
    addMetric
}