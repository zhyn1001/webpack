var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');//生成html
var CleanWebpackPlugin = require('clean-webpack-plugin');//清除旧的文件
var ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');

module.exports = {
	entry:{
		main:__dirname+"/src/js/main.js",
		a:__dirname+"/src/js/a.js",
		b:__dirname+"/src/js/b.js"
	},
	output:{
		path:__dirname + "/public",//打包后存放文件的地方
		filename:"js/[name]-[hash].js"//输出文件
	},
	devServer:{//本地服务器
		contentBase:"./public",//本地服务器所加载的页面所在的目录
		port:'8000'
	},
	module:{
		rules:[//webpack4.X规定必须使用rules
			{
				test:/\.js$/,
				use:'babel-loader',
				exclude: path.resolve(__dirname,"node_modules"),//不检查node_modules下的js
				include: path.resolve(__dirname,"src")//只解析src中的js
			},
			/*{
				test:/\.css$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'less-loader'}
				]
			},*/
			{
				test:/\.css$/,
				use:ExtractTextWebpackPlugin.extract({
					// 将css用link的方式引入就不再需要style-loader了
					use:'css-loader!postcss-loader'
				})
			},
			{
				test:/\.less$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'less-loader'}
				]
			},
			{
				test:/\.(png|jpg|jpeg|gif|svg)/i,
				use:[
					{
						loader:'file-loader',
						options:{
							name:'images/[name]-[hash].[ext]'
						}
					}
				]
			}
			/*{
				test:/\.(png|jpg|jpeg|gif|svg)/i,
				use:[
					{
						loader:'url-loader',
						options:{
							limit:50000,//设定大小限制大于他就用文件形式，小于就压缩成base64为(10000=10k)
							name:'images/[name]-[hash:5].[ext]'
						}
					}
				]
			}*/
		]
	},
	mode:'development',
	plugins:[
		new HtmlWebpackPlugin({
			title:'webpack hello',
			template:__dirname+"/src/tmpl/index.tmpl.html",
			filename:"index.html",
			date:new Date(),
			chunks:['main']
		}),
		new HtmlWebpackPlugin({
			title:'webpack a',
			template:__dirname+"/src/tmpl/index.tmpl.html",
			filename:"a.html",
			date:new Date(),
			chunks:['a']
		}),
		new HtmlWebpackPlugin({
			title:'webpack b',
			template:__dirname+"/src/tmpl/index.tmpl.html",
			filename:"b.html",
			date:new Date(),
			chunks:['b']
		}),
		new CleanWebpackPlugin('public',{
			verbose:true,//将log写道console中
			dry:false,//不要删除任何东西，用于测试
			exclude:['']//排除不删除的目录，避免删除公共文件
		}),
		new ExtractTextWebpackPlugin('css/style.css')
	]
}
