const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');

module.exports = () => {
	let bundleStart = null;
	const compiler = Webpack(webpackConfig);

	compiler.plugin('compile', () => {
		console.info('Bundling...');
		bundleStart = Date.now();
	});

	compiler.plugin('done', () => {
		console.info(`Bundled in ${(Date.now() - bundleStart)}ms!`);
	});

	const bundler = new WebpackDevServer(compiler, {
		publicPath: '/build/',
		hot: true,
		quiet: false,
		noInfo: true,
		stats: {
			colors: true,
		},
	});

	bundler.listen(8080, 'localhost', () => {
		console.info('Bundling project, please wait...');
	});
};
