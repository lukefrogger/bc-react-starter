const serverless = require('serverless-http')
const express = require('express');
const { app, createRoutes } = require('./app')

app.use('/.netlify/functions/index/', createRoutes(express.Router()))

module.exports = app
module.exports.handler = serverless(app)
