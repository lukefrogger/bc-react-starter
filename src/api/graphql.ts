const config = {
  commerceUrl: '', // TODO: Get it from `.env`
  // expires 01/14/2021
  apiToken: '', // TODO: Get it from `.env`
}

async function fetchGraphqlApi(
  query: string,
  { variables, preview }: any = {},
  fetchOptions: any
) {
  // log.warn(query)
  const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
    ...fetchOptions,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    throw new Error('Failed to fetch Bigcommerce API')
  }

  return { data: json.data, res }
}

export default fetchGraphqlApi
