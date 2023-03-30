const proxy = require('../../app/proxy/proxy')
const httpClient = require('../../app/proxy/call-api')

jest.mock('../../app/proxy/call-api')

describe('proxy module', () => {
    describe('proxy', () => {
        test('proxy a request', async () => {
            httpClient.callApi.mockResolvedValue({status: 200, body: {}})
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
            expect(result.status).toBe(200)
        })

        test('should return error when max requests are reached for ip', async () => {
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

            const result = await proxy.proxy({ip: "ip", query: {}}, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(429)
            expect(result.body.error).toBe('Given endpoint reached max requests by defined rule')
        })

        test('should return error when max requests are reached for path', async () => {
            const mockRepository = {
                db: { 
                    create: () => true,
                    getOneSearch: () => ({ _source: {max_requests: 1}}),
                },
                cache: {
                    getCache: (_, key) => key == "path" ? 1 : 0,
                    putCache: () => 1
                }
            }

            const result = await proxy.proxy({path: "path", query: {}}, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(429)
            expect(result.body.error).toBe('Given endpoint reached max requests by defined rule')
        })

        test('when an error occurs', async () => {
            httpClient.callApi.mockResolvedValue({status: 500, body: {}})
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
            expect(result.status).toBe(500)
        })
    })
})