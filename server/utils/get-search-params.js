export function getSearchParams(url) {
  function paramsToObject(entries) {
    const result = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of entries) {
      result[key] = value
    }
    return result
  }

  const [, urlSearchParams] = url.split('/?')
  const urlParams = new URLSearchParams(urlSearchParams)
  const entries = urlParams.entries() // returns an iterator of decoded [key,value] tuples
  return paramsToObject(entries)
}
