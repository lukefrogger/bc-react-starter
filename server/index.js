import connect from "connect";
import compression from "compression";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import * as proxy from "http-proxy-middleware";
import path from "path";
import serveStatic from "serve-static";
import fs from 'fs';

import { onStoreProxyReq, getProductHelper, cartHelper, countryHelper, stateHelper } from "./helpers";

const app = connect();

app.use(cors());

// gzip/deflate outgoing responses
app.use(compression());

// parse urlencoded request bodies into req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const __dirname = path.resolve(path.dirname(''));
app.use(serveStatic(path.join(__dirname, 'build')))
app.use(serveStatic(path.join(__dirname, 'public')))

// respond to all requests
app.use("/cart-helper", cartHelper);
app.use("/countries", countryHelper);
app.use("/country/", stateHelper);
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

// Handles any requests that don't match the ones above
app.use((req,res) =>{
	fs.createReadStream('build/index.html').pipe(res)
});

//create node.js http server and listen on port
http.createServer(app).listen(process.env.PORT || 3030);

// const BC_CONFIG = {
	// token: process.env.BIGCOMMERCE_STORE_API_TOKEN,
	// client_id: process.env.BC_CLIENT_ID,
	// hash: process.env.BC_STORE_HASH,
// };
