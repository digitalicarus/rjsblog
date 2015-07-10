var path    = require('path')
,   webpack = require('webpack')
;

// lot's of help from https://github.com/petehunt/webpack-howto
module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./js/app' // Your appʼs entry point
    ],
    output: {
        filename: "js/bundle.js"
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// example of polyfilling with webpack https://gist.github.com/Couto/b29676dd1ab8714a818f
		new webpack.ProvidePlugin({
			'arrayutils': 'imports?this=>global!exports?global.arrayutils!arrayutils'
		})
	],
	resolve: {
		// require files in app without specifying extensions
		extensions: ['', '.js', '.json', '.jsx', '.less'],
		alias: {
			// pretty useful to have a starting point in nested modules
			'appRoot': path.join(__dirname, 'js'),
			'vendor': 'appRoot/vendor'
		}
	},
    module: {
        loaders: [
			{ test: /\.less$/,      loader: 'style-loader!css-loader!!autoprefixer?browsers=last 2 version!less-loader' },
			{ test: /\.css$/,       loader: 'style-loader!css-loader' },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}, // inline base64 URLs for <=8k images, direct URLs for the rest
			{ 
				test: /\.jsx?$/, 
				include: [
					path.join(__dirname, 'js') // files to apply this loader to
				], 
				exclude: '/node-modules/', // don't transform all our node modules! 
				loaders: ['react-hot', 'babel'] // loaders process from right to left
			}
        ]
    }
};
