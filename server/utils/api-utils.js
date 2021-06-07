import { Stream } from 'stream'

export function apiResWrapper(res) {
  res.status = (statusCode) => sendStatusCode(res, statusCode)
  res.json = (data) => sendJson(res, data)
  res.send = (data) => sendData(res, data)
  res.redirect = (statusOrUrl, url) => redirect(res, statusOrUrl, url)
  return res
}

/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */
function sendStatusCode(res, statusCode) {
  res.statusCode = statusCode
  return apiResWrapper(res)
}

/**
 * Send `JSON` object
 * @param res response object
 * @param jsonBody of data
 */
function sendJson(res, jsonBody) {
  // Set header to application/json
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  // Use send to handle request
  res.send(jsonBody)
  return res
}

/**
 * Send `any` body to response
 * @param req request object
 * @param res response object
 * @param body of response
 */
export function sendData(res, body) {
  if (body === null || body === undefined) {
    res.end()
    return res
  }

  const contentType = res.getHeader('Content-Type')

  if (body instanceof Stream) {
    if (!contentType) {
      res.setHeader('Content-Type', 'application/octet-stream')
    }
    body.pipe(res)
    return res
  }

  const isJSONLike = ['object', 'number', 'boolean'].includes(typeof body)
  const stringifiedBody = isJSONLike ? JSON.stringify(body) : body
  /*   const etag = generateETag(stringifiedBody)
  if (sendEtagResponse(req, res, etag)) {
    return
  } */

  if (Buffer.isBuffer(body)) {
    if (!contentType) {
      res.setHeader('Content-Type', 'application/octet-stream')
    }
    res.setHeader('Content-Length', body.length)
    res.end(body)
    return res
  }

  if (isJSONLike) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
  }

  res.setHeader('Content-Length', Buffer.byteLength(stringifiedBody))
  res.end(stringifiedBody)
  return res
}

/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */
function redirect(res, statusOrUrl, url) {
  if (typeof statusOrUrl === 'string') {
    url = statusOrUrl // eslint-disable-line no-param-reassign
    statusOrUrl = 307 // eslint-disable-line no-param-reassign
  }
  if (typeof statusOrUrl !== 'number' || typeof url !== 'string') {
    throw new Error(
      `Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`
    )
  }
  res.writeHead(statusOrUrl, { Location: url })
  res.write('')
  res.end()
  return res
}
