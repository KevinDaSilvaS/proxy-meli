const rules = require('../../app/rules/rules')

describe('rules module', () => {
    describe('getRule', () => {
        test('should get a rule', async () => {
            const mockRepository = {
                db: { getOneSearch: () => true }
            }

            expect(await rules.getRule("path", mockRepository)).toBeDefined()
        })

        test('should return undefined when rule is not found', async () => {
            const mockRepository = {
                db: { getOneSearch: () => undefined }
            }

            expect(await rules.getRule("path", mockRepository))
                .not.toBeDefined()
        })
    })

    describe('removeRule', () => {
        test('should remove a rule', async () => {
            const mockRepository = {
                db: { remove: () => true }
            }

            const result = await rules.removeRule("path", mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(204)
        })
    })

    describe('addRule', () => {
        test('should create a rule', async () => {
            const mockRepository = {
                db: { 
                    getOneSearch: () => false,
                    create: () => {} 
                }
            }

            const result = await rules.addRule({type: "path"}, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(201)
        })

        test('should not create a rule due to not supported type', async () => {
            const mockRepository = {
                db: { 
                    getOneSearch: () => false,
                    create: () => {} 
                }
            }

            const result = await rules.addRule({type: "mytype"}, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(400)
            expect(result.body.error).toBe('Type informed is not supported')
        })

        test('should not create a rule due to rule already existing for following type', async () => {
            const mockRepository = {
                db: { 
                    getOneSearch: () => true,
                    create: () => {} 
                }
            }

            const result = await rules.addRule({type: "path"}, mockRepository)
            expect(result).toBeDefined()
            expect(result.status).toBe(409)
            expect(result.body.error).toBe('There\'s an existing rule with this type, delete existing rule first, then try again')
        })
    })
})