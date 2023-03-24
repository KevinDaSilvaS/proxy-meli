const Redis = require("ioredis")

const connect = async () => await new Redis({
    host: process.env.REDIS_HOST
})

const putCache = async (conn, key, value, ttl) => await conn.setex(key, ttl, value)

const getCache = async (conn, key) => await conn.get(key)
                                        .then((result) => result)

module.exports = {
    connect,
    putCache,
    getCache
}
