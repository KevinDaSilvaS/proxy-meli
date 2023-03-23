const { Client } = require('@elastic/elasticsearch')

const conn = async () => {
    const connection = await new Client({
        node: 'http://localhost:9200/'
    })

    return connection
}

const create = async (document, index, elasticsearchConnection) => {
    const inserted = await elasticsearchConnection.index({ index, document })
    await elasticsearchConnection.indices.refresh({ index })
    return await getOne({id: inserted._id}, "rules", elasticsearchConnection)
}

const search = async (query, index, elasticsearchConnection) => {
    try {
        await elasticsearchConnection.indices.refresh({ index })

        const res = await elasticsearchConnection.search({ index, query: {
            ...query
        }})

        return res.hits.hits
    } catch (error) {
        return []
    }
    
}

const remove = async (query, index, elasticsearchConnection) => {
    const res = await getOneSearch(query, index, elasticsearchConnection)
    if (!res) {
        return 
    }
    await elasticsearchConnection.delete({
        id: res._id,
        index
    })
}

getOneSearch = async (query, index, elasticsearchConnection) => {
    const result = await search({match: query}, index, elasticsearchConnection)
    return result.length > 0 ? result[0] : undefined
}
    
const getOne = async (query, index, elasticsearchConnection) => 
    await elasticsearchConnection.get({index, ...query})

module.exports = {
    getOneSearch,
    conn,
    create,
    remove,
    search
}