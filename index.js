require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.APP_PORT
const rules = require('./app/rules/rules')
const metrics = require('./app/monitoring/metrics')
const proxy = require('./app/proxy/proxy')
const routes = require('./helpers/routes')
const cacheRepository = require('./repository/cache-repository')
const dbRepository = require('./repository/elasticsearch-repository')

const cacheConn = cacheRepository.connect()
const dbConn = dbRepository.conn()

const repository = {
  cacheConn,
  dbConn,
  db: dbRepository,
  cache: cacheRepository
}

app.use(express.json())

app.use(async (req, res, next) => {
  const startPath = req.path.split('/')[1]

  if (routes[startPath]) {
    return next()
  }

  const {status, body, headers} = await proxy.proxy(req, repository)

  res.headers = { ...res.headers, ...headers }

  return res.status(status).send(body)
})

app.post('/rules', async (req, res) => {
  const {status, body} = await rules.addRule(req.body, repository)
  res.status(status).send(body)
})

app.delete('/rules/:type', async (req, res) => {
  const {status, body} = await rules.removeRule(req.params.type, repository)
  res.status(status).send(body)
})

app.get('/metrics', async (req, res) => {
  const {status, body} = await metrics.getMetrics(req.query, repository)
  res.status(status).send(body)
})

app.listen(port, async () => {
  repository.dbConn = await dbConn
  repository.cacheConn = await cacheConn
  console.log(`Example app listening on port ${port}`)
})
