import fs from 'fs'

import axios from 'axios'

const [host] = process.env.REACT_APP_API_ENDPOINT.split('/api')
const expiresAt = parseInt(Date.now() / 1000 + 3600 * 24, 10)

axios('https://api.bigcommerce.com/stores/iob9uitsuj/v3/storefront/api-token', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-auth-token': 'fot3oc8s4odoeblcw975uui6qwafl0x',
  },
  data: {
    channel_id: 1,
    expires_at: expiresAt,
    allowed_cors_origins: [host],
  },
})
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
