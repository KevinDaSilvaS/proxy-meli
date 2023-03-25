const httpClient = require('../../app/proxy/call-api')
const axios = require('axios')

jest.mock('axios')

describe('call-api module', () => {
    describe('callApi', () => {
        test('should make an http request', async () => {
            axios.mockResolvedValue(true)

            const result = await httpClient.callApi({
                url: 'url', 
                path: 'path', 
                headers: {}, 
                method: 'method', 
                body: {}, 
                query: {}
            })
            expect(result).toBeDefined()
            expect(result.status).toBe(200)
        })

        test('should throw an error when making an http request', async () => {
            const result = await httpClient.callApi({
                url: 'url', 
                path: 'path', 
                headers: {}, 
                method: 0, 
                body: 'body', 
                query: {}
            })
            expect(result).toBeDefined()
            expect(result.status).toBe(500)
        })
    })
})