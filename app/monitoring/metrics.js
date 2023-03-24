const index = "metrics"

const addMetric = async (metric, repository) => {
    return await repository.db.create(metric, index, repository.dbConn)
}

const getMetrics = async (filters, repository) => {
    filters = mapFilters(filters)

    return {
        status: 200,
        body: await fetchData(filters, index, repository)
    }
}

const fetchData = async (data, index, repository) => {
    const connection = repository.dbConn
    if (typeof data == 'string') {
        const result = await repository.db.sql(data, index, connection)
        return mapOutput(result) 
    }

    return await repository.db.search(data, index, connection) 
}

const mapOutput = data => {
    const [arrayTableFields, rows] = Object.values(data)

    const fields = arrayTableFields.map(field => field.name)

    const metrics = rows.map(row => {
        const metric = {}
        for (let i = 0; i < row.length; i++) {
            const element = row[i]
            const key = fields[i] 
            metric[key] = element
        }
        return metric
    })

    return metrics
}

const mapFilters = filters => {
    const type = filters.type
    if (Object.keys(filters).length <= 0) 
        return { match_all: {} }

    const sanitizedFilters = {}

    if (filters.count_requests && type) {
        return `SELECT 
        COUNT(${type}) as total_requests, 
        ip,
        path,
        url,
        method
        FROM metrics 
        GROUP BY ip, path, url, method
        ORDER BY total_requests DESC`
    }  
    
    if (filters.max_requests_reached && type) 
        sanitizedFilters.max_reached = type

    return {
        match: sanitizedFilters
    }
}

module.exports = {
    getMetrics,
    addMetric
}