import http from 'http'

import cors from 'cors'
import express from 'express'

import { app, createRoutes } from './app'

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)

// force https on production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect(`https://${req.headers.host}${req.url}`)
    return next()
  }
  return next()
})

app.use('/', createRoutes(express.Router()))

http.createServer(app).listen(process.env.PORT || 3030)
