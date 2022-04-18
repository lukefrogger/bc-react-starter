/**
 * @module getEnvVariable
 * @description returns the value of any .env file variable using process.env[variable].
 */

export function getEnvVariable(variable: string): string | undefined {
  if (!variable) {
    return undefined
  }

  return process.env[variable]
}
