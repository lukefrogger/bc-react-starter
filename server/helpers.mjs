import fetchProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product.js";
import cartApi from "@bigcommerce/storefront-data-hooks/api/cart";

export const onStoreProxyReq = (proxyReq, req, res) => {
	proxyReq.setHeader(
		"X-Auth-Client",
		process.env.BIGCOMMERCE_STORE_API_CLIENT_ID
	);
	proxyReq.setHeader("X-Auth-Token", process.env.BIGCOMMERCE_STORE_API_TOKEN);
}

export const getProductHelper = async (req, res) => {
	const [first, slug, ...rest] = req.url.split("/");
	const query = { slug };
	const data = await fetchProduct.default({
		variables: query,
	});

	res.write(JSON.stringify(data));
	res.end();
}

export const wrapResponse = (res) => {
	res.json = (data) => {
		res.write(JSON.stringify(data));
	};

	res.status = (s) => {
		res.statusCode = s;
		return res;
	};
	return res;
}

export const cartHelper = async (req, res) => {
	const [first, cartId, ...rest] = req.url.split("/");
	const handler = await cartApi.default();
	req.cookies = { bc_cartId: cartId || null };
	const cart = await handler(req, wrapResponse(res), cartApi.handlers);
	res.end();
}
