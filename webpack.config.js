var path = require('path')
var webpack = require('webpack')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	entry:'./src/main.js',
	output:{
		path:path.resolve(__dirname,'./dist'),
		publicPath:'/dist/',
		filename:'build.js'
	},
	module:{
		rules:[
		{
			test:/\.vue$/,
			loader:'vue-loader',
			options:{
				loaders:{}
			}
		},
		{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:/node_modules/
		},
		{
			test: /iview.src.*?js$/,
            loader: 'babel-loader'
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
		},
		{
			test: /\.css$/,
            loader: 'style-loader!css-loader'
		},
		{
			test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
		},
		{
			test: /muse-ui.src.*?js$/,
            loader: 'babel-loader'
		},
		{
			test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
		}
		]
	},
	resolve:{
		alias:{
			'vue$':'vue/dist/vue.esm.js',
			'muse-components':'muse-ui/src'
		}
	},
	// plugins:[
  //       new UglifyJsPlugin()
  //   ],
	// optimization: {
	//  minimizer: [
	// 	 new UglifyJsPlugin({ /* your config */ })
	//  ]
 // },
	devServer:{
		historyApiFallback:true,
		noInfo:true
	},
	performance: {
        hints: false
    },
     plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    devtool: '#eval-source-map'
}

if(process.env.NODE_ENV === 'production'){
	module.exports.devtool = '#source-map'
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:'production'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
	])
}
