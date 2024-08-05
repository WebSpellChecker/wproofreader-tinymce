const path = require('path');
const configs = require('./webpack.prod');

const server = (env) => {
	return {
		mode: env.mode,
		entry: {},
		devServer: {
			port: 5000,
			open: true,
			hot: false,
			static: [
				{
					directory: path.join(__dirname, 'samples'),
					publicPath: '/',
					watch: true
				},
				{
					directory: path.join(__dirname, 'dist'),
					publicPath: '/dist',
					watch: true
				}
			],
			devMiddleware: {
				publicPath: '/dist',
				writeToDisk: true
			}
		},

		devtool: 'eval-source-map',
	};
};

configs.push(server);

module.exports = configs;
