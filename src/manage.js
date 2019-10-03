const fs = require('fs')
const ejs = require('ejs')
const uuid = require('uuid/v4')
const path = require('path').resolve()
let count = 0
if (!fs.existsSync(path + '/auth/')) fs.mkdirSync(path + '/auth/')
fs.writeFileSync(path + '/auth/auth.json', '[]')
const auth = require(path + '/auth/auth.json')
const randomHexColor = require('random-hex-color')

exports.query = (req, res, bots) => {
  const sessionID = uuid()
  auth[auth.length] = sessionID
  fs.writeFileSync(path + '/auth/auth.json', JSON.stringify(auth))

  switch (req.params.page) {
    case 'login':
      ejs.renderFile(path + '/src/page/index.ejs', { count: ++count, sessionID: sessionID }, (err, str) => {
        if (err) console.error(err)
        else res.send(str)
      })
      break

    case 'dashboard':
      ejs.renderFile(path + '/src/page/dashboard.ejs', { bot: bots[req.params.botKey], botKey: req.params.botKey, randomHexColor: randomHexColor }, (err, str) => {
        if (err) res.redirect('/')
        else res.send(str)
      })
  }
}
