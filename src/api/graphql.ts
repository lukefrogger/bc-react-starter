const config = {
    commerceUrl: "https://store-iob9uitsuj.mybigcommerce.com/graphql",
    // expires 01/14/2021
    apiToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJlYXQiOjE2MTA1NjQzNTYsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxLCJjb3JzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCJdLCJjaWQiOjEsImlhdCI6MTYwNzk3MjM5Mywic3ViIjoiYXRzZnh6eDh2eGdrNndvN2YyMGhnOXJrZ2w5MWs3OCIsInNpZCI6OTk5NzQzNjk5LCJpc3MiOiJCQyJ9.tWxhCESvKtSj6X7i_aQ06s1yX-VPzWg05nS_zCJfnqP5416n8QiI7k1QGvFAeGtHujxcxmnaFtaKVqSgIa2OLA"
};

async function fetchGraphqlApi(
    query: string,
    { variables, preview }: any = {},
    fetchOptions: any
) {
    // log.warn(query)
    const res = await fetch(config.commerceUrl + (preview ? "/preview" : ""), {
        ...fetchOptions,
        method: "POST",
        headers: {
            Authorization: `Bearer ${config.apiToken}`,
            ...fetchOptions?.headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    const json = await res.json();

    if (json.errors) {
        throw new Error("Failed to fetch Bigcommerce API");
    }

    return { data: json.data, res };
}

export default fetchGraphqlApi;
