const serverless = require('serverless-http')
const { app } = require('../../server/app')

module.exports = app
module.exports.handler = serverless(app)
