const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VersionFile = require('webpack-version-file');

const plugin = (env) => {
	return {
		mode: env.mode,
		entry: {
			main: './src/plugin.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'plugin.js'
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: false,
						format: {
							comments: false,
							beautify: true,
						},
						mangle: {
							keep_classnames: true,
							keep_fnames: true,
						},
					},
					extractComments: false
				}),
			],
		},
	};
};

const pluginMin = (env) => {
	return {
		mode: env.mode,
		entry: {
			main: './src/plugin.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'plugin.min.js'
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false
				})
			]
		}
	};
};

const environment = (env) => {
	return {
		mode: env.mode,
		entry: {},
		plugins: [
			new CopyPlugin({
				patterns: ['LICENCE.md', 'CHANGELOG.md'],
			}),
			new VersionFile({
				output: './dist/version.txt',
				package: './package.json',
				templateString: `<%= version %>-${env.buildNumber ? env.buildNumber : 0}`
			})
		]
	};
};

module.exports = [plugin, pluginMin, environment];
