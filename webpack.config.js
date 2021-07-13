const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		alias: {
			react: path.join(__dirname, 'node_modules', 'react'),
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	devServer: {
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: [
					{ loader: 'babel-loader' },
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.json',
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s[ac]ss|css$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
		}),
		new Dotenv(),
	],
};
