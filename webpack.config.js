const path = require("path");
const glob = require("glob");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
	mode: "production",
	//devtool: "inline-source-map",
	entry: ["./src/meow.ts", ...glob.sync(path.join(__dirname, "./src/controllers/**/*.ts"))],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ["babel-loader", "ts-loader"],
				exclude: /(node_modules|server)/,
			},
			{
				test: /\.(txt|css)$/i,
				use: "raw-loader",
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// { loader: "style-loader", options: { injectType: "linkTag" } },
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: () => [autoprefixer()],
						},
					},
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|ttf|pdf)$/i,
				use: [
					{
						loader: "file-loader",
						options: {},
					},
				],
			},
			{
				test: /\.html$/i,
				use: [
					{
						loader: "html-loader",
						options: {},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".ts"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			//favicon: "favicon.ico",
			template: "src/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
			//filename: "[name].[hash].css",
			//chunkFilename: "[id].[hash].css",
		}),
	],
	target: "web",
};
