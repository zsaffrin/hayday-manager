const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const path = require('path');
const bundle = require('./server/bundler.js');

const app = express();
const proxy = httpProxy.createProxyServer();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3013;
const publicPath = path.join(__dirname, 'client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(publicPath));

if (!isProduction) {
	bundle();

	app.all('/build/*', (req, res) => {
		proxy.web(req, res, {
			target: 'http://localhost:8080',
		});
	});
}

app.get('*', (req, res) => {
	res.sendFile(`${publicPath}/index.html`);
});

proxy.on('error', (e) => {
	console.error('Could not connect to proxy, please try again');
	console.error(e);
});

app.listen(port, () => {
	console.info(`HayDay-Manager server listening on port ${port}`);
});
