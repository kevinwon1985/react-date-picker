var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'cheap-source-map',
	entry: {
		app: './demo/main',
		vendor: ['react', 'react-dom', 'moment', 'react-onclickoutside/decorator']
	},
	output: {
		path: path.join(__dirname, 'demo/static'),
		filename: 'bundle.js',
		publicPath: '/static/',
		sourceMapFilename: '[file].map'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
	],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel',
				exclude: /node_modules/
			}
		]
	}
}