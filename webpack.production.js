// basic vars
const path = require('path');
const webpack = require('webpack');

// additional plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImagesminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

// module settings
module.exports = {
	mode: "development",
	watch: false,

	// базовый путь к проекту
	context: path.resolve(__dirname, 'myApp'),

	// точки входа js
	entry: {
		// основной фал приложения
		app: [
			'./js/index.js', // относительно context
			'./scss/index.scss'
		],
	},

	// путь для собранных файлов
	output: {
		filename: 'js/index.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '../'
	},

	module: {
		rules: [
			// scss
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader:'css-loader'
						},
						{
							loader:'postcss-loader'
						},
						{
							loader:'sass-loader'
						},
					],
					fallback: 'style-loader',
				})
			},

			// загрузка изображений
			{
				test: /\.{png|gif|jpe&g}$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					},
					'img-loader'
				]
			},

			// fonts
			{
				test: /\.{woff|woff2|eot|ttf|otf}$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					}
				]
			},

			// svg
			{
				test: /\.svg/,
				loader: 'svg-url-loader'
			}
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			Popper: ['popper.js', 'default']
		}),

		new ExtractTextPlugin({
			filename: './css/index.css'
		}),

		new CleanWebpackPlugin (),

		new CopyWebpackPlugin(
			[{from: './images',	to: 'images'}],
			{ignore: [{glob: 'svg/*'}]}
		),

		new UglifyJSPlugin(),

		new ImagesminPlugin({
			test: /\.{png|gif|jpe&g|svg}$/i
		}),

		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
};