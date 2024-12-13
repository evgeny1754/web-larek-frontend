// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

const stylesHandler = MiniCssExtractPlugin.loader;

const getConfig = (mode) => ({
	entry: './src/index.ts',
	devtool: 'source-map',
	mode,
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		open: false,
		host: 'localhost',
		watchFiles: ['src/pages/*.html'],
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/pages/index.html',
		}),

		new MiniCssExtractPlugin(),

		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
		new DefinePlugin({
			'process.env.DEVELOPMENT': mode !== 'production',
			'process.env.API_ORIGIN': JSON.stringify(process.env.API_ORIGIN ?? ''),
		}),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				use: ['babel-loader', 'ts-loader'],
				exclude: ['/node_modules/'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					stylesHandler,
					'css-loader',
					'postcss-loader',
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sassOptions: {
								includePaths: ['src/scss'],
							},
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					keep_classnames: true,
					keep_fnames: true,
				},
			}),
		],
	},
});

module.exports = (env, argv) => getConfig(argv.mode);
