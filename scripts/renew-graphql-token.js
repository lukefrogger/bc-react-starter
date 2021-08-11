import fs from 'fs'

import axios from 'axios'

const [host] = process.env.REACT_APP_API_ENDPOINT.split('/api')
const expiresAt = parseInt(Date.now() / 1000 + 3600 * 24 * 365, 10)

const { BIGCOMMERCE_STORE_HASH, BIGCOMMERCE_STORE_API_TOKEN } = process.env

axios(
  `https://api.bigcommerce.com/stores/${BIGCOMMERCE_STORE_HASH}/v3/storefront/api-token`,
  {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-auth-token': BIGCOMMERCE_STORE_API_TOKEN,
    },
    data: {
      channel_id: 1,
      expires_at: expiresAt,
      allowed_cors_origins: [host],
    },
  }
)
  .then((response) => {
    const newEnvVar = `BIGCOMMERCE_STOREFRONT_API_TOKEN=${response.data.data.token}`

    if (process.env.PORT) {
      throw new Error()
    }

    return fs.readFile('.env', 'utf8', (err, data) => {
      const lines = data.split('\n')
      const without = lines.filter(
        (line) =>
          !/^BIGCOMMERCE_STOREFRONT_API_TOKEN=/.test(line) && line !== ''
      )
      const newLines = [...without, newEnvVar].join('\n')

      fs.writeFile('.env', newLines, () => {
        console.log(newLines)
      })
    })
  })
  .catch((error) => {
    if (error) throw new Error(error)
  })
