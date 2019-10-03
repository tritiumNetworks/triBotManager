const PORT = process.env.tbmPORT || 8080

const cors = require('cors')
const path = require('path').resolve()
const chalk = require('chalk')
const express = require('express')
const packageInfo = require('./package.json')

const api = require('./src/api')
const manage = require('./src/manage')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/manage', express.static(path + '/src/page/'))

app.get('/', (_req, res) => {
  res.redirect('/manage/login')
})

app.get('/manage/:page', (req, res) => {
  manage.query(req, res)
})

app.get('/manage/:page/:botKey', (req, res) => {
  manage.query(req, res, api.bots)
})

app.get('/api/non-secured/:task/:botKey', (req, res) => {
  api.nonSecure(req, res)
})

app.post('/api/secured', (req, res) => {
  api.secure(req, res)
})

app.listen(PORT, () => {
  console.log(packageInfo.name + ' Version ' + packageInfo.version)
  console.log(chalk.green('Hello, Welcome to Tritium Networks Bot Manager') + ' | ' + chalk.yellow('Your TBM Server is now online on http://localhost:') + chalk.yellow.bold(PORT))
})
