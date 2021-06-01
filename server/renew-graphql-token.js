import fs from 'fs'

import request from 'request'

const [host] = process.env.REACT_APP_API_ENDPOINT.split('/api')
const expiresAt = parseInt(Date.now() / 1000 + 3600 * 24, 10)

const options = {
  method: 'POST',
  url: 'https://api.bigcommerce.com/stores/iob9uitsuj/v3/storefront/api-token',
  headers: {
    'content-type': 'application/json',
    'x-auth-token': 'fot3oc8s4odoeblcw975uui6qwafl0x',
  },
  body: {
    channel_id: 1,
    expires_at: expiresAt,
    allowed_cors_origins: [host],
  },
  json: true,
}

request(options, function (error, response, body) {
  if (error) throw new Error(error)
  const newEnvVar = `BIGCOMMERCE_STOREFRONT_API_TOKEN=${body.data.token}`

  if (process.env.PORT) {
    return
  }

  fs.readFile('.env', 'utf8', (err, data) => {
    const lines = data.split('\n')
    const without = lines.filter(
      (line) => !/^BIGCOMMERCE_STOREFRONT_API_TOKEN=/.test(line) && line !== ''
    )
    const newLines = [...without, newEnvVar].join('\n')

    fs.writeFile('.env', newLines, () => {
      console.log(newLines)
    })
  })
})
