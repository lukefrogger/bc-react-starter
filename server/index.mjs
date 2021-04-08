import connect from "connect";
import compression from "compression";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import * as proxy from "http-proxy-middleware";

import { onStoreProxyReq, getProductHelper, cartHelper } from "./helpers";

const app = connect();

app.use(cors());

// gzip/deflate outgoing responses
app.use(compression());

// parse urlencoded request bodies into req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// respond to all requests
app.use("/cart", cartHelper);
app.use("/product", getProductHelper);
app.use(
	"/api",
	proxy.createProxyMiddleware({
		target: process.env.BIGCOMMERCE_STORE_API_URL,
		changeOrigin: true,
		logLevel: "debug",
		pathRewrite: function(path, req) {
			return path.replace("/api", "");
		},
		onProxyReq: onStoreProxyReq,
	})
);

app.use("/hello", function(req, res) {
	res.end("Hello from your Bigcommerce Proxy Server!\n");
});

//create node.js http server and listen on port
http.createServer(app).listen(3030);

const BC_CONFIG = {
	token: process.env.BIGCOMMERCE_STORE_API_TOKEN,
	client_id: process.env.BC_CLIENT_ID,
	hash: process.env.BC_STORE_HASH,
};
