/**
 * @module API Config
 *
 * @description default config settings for SuperAgent requests.
 */

// API Url for the node proxy
const apiBase = `http://localhost:3030/api`;

const apiHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

export { apiBase, apiHeaders }
