const metrics = require('../../app/monitoring/metrics')

describe('metrics module', () => {
    describe('getMetrics', () => {
        test('should get a list of metrics when theres no filters set', async () => {
            const mockRepository = {
                db: { search: () => true }
            }

            const result = await metrics.getMetrics({}, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(200)
        })

        test('should get a list of metrics when theres filter for max_requests_reached set', async () => {
            const mockRepository = {
                db: { search: () => true }
            }

            const result = await metrics.getMetrics({
                type: "ip",
                max_requests_reached: true
            }, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(200)
        })

        test('should get a list of metrics when theres filter for count_requests set', async () => {
            const mockRepository = {
                db: { sql: () => [[{name: "url"}], ["url"]] }
            }

            const result = await metrics.getMetrics({
                type: "ip",
                count_requests: true
            }, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(200)
        })

        test('should get a list of metrics and ignore non supported filters', async () => {
            const mockRepository = {
                db: { search: () => true }
            }

            const result = await metrics.getMetrics({
                my_non_supported_filter: "my_non_supported_filter"
            }, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(200)
        })
    })

    describe('addMetric', () => {
        test('should create a metric', async () => {
            const mockRepository = {
                db: { create: () => true }
            }

            const result = await metrics.addMetric({type: "path"}, mockRepository)
            expect(result).toBeDefined()
        })
    })
})