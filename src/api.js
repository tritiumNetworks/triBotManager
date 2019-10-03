let bots = {}
const uuid = require('uuid/v4')
const discord = require('discord.js')

exports.secure = (req, res) => {
  const requestBody = req.body
  if (require('../auth/auth.json').includes(requestBody.from)) {
    const botKey = uuid()
    bots[botKey] = new discord.Client()

    bots[botKey].login(requestBody.token).catch(() => {
      return res.send({ status: 'fail' })
    })

    bots[botKey].on('ready', () => {
      return res.send({ status: 'success', name: bots[botKey].user.username, botKey: botKey })
    })
  } else {
    res.send({ status: 'fail' })
  }
}

exports.nonSecure = (req, res) => {
  switch (req.params.task) {
    case 'getPing':
      res.send({ ping: bots[req.params.botKey].ping })
  }
}

exports.bots = bots
