const Webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'index.js');
const clientPath = path.join(__dirname, 'client');

const config = {
	devtool: 'eval',
	entry: {
		app: [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080',
			sourcePath,
		],
	},
	output: {
		path: clientPath,
		filename: 'bundle.js',
		publicPath: '/build/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				use: 'file-loader?name=fonts/[name].[ext]',
			},
			{
				test: /\.svg$/,
				use: 'file-loader?name=img/svg/[name].[ext]',
			},
		],
	},
	plugins: [
		new Webpack.optimize.OccurrenceOrderPlugin(),
		new Webpack.HotModuleReplacementPlugin(),
	],
};

module.exports = config;
