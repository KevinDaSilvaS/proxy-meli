const addMetric = (metric, repository) => {
    //console.log("add metric")
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