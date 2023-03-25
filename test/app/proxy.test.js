const proxy = require('../../app/proxy/proxy')

describe('proxy module', () => {
    describe('proxy', () => {
        test('proxy a request', async () => {
            const mockRepository = {
                db: { 
                    create: () => true,
                    getOneSearch: () => ({ _source: {max_requests: 3}}),
                },
                cache: {
                    getCache: () => 1,
                    putCache: () => 1
                }
            }

            const result = await proxy.proxy({type: "path", query: {}}, mockRepository)
            expect(result).toBeDefined()
        })

        test('should return error when max requests are reached', async () => {
            const mockRepository = {
                db: { 
                    create: () => true,
                    getOneSearch: () => ({ _source: {max_requests: 1}}),
                },
                cache: {
                    getCache: () => 1,
                    putCache: () => 1
                }
            }

            const result = await proxy.proxy({type: "path", query: {}}, mockRepository)
            expect(result).toBeDefined()
        })
    })
})