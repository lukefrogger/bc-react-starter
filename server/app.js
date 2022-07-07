import path from 'path'

import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import serveStatic from 'serve-static'

import { createRoutes } from './routes'

const app = express()

// gzip/deflate outgoing responses
app.use(compression())

// parse urlencoded request bodies into req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

const dirname = path.resolve(path.dirname(''))
app.use(serveStatic(path.join(dirname, 'build')))
app.use(serveStatic(path.join(dirname, 'public')))

export { app, createRoutes }
