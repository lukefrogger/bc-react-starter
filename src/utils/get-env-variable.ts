/**
 * @module getEnvVariable
 * @description returns the value of any .env file variable using process.env[variable].
 */

import _ from 'lodash'

export function getEnvVariable(variable: string): string | undefined {
  if (!variable || _.isEmpty(variable)) {
    return undefined
  }

  return variable
}
