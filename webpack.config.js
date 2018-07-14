var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry:__dirname+"/src/js/main.js",
	output:{
		path:__dirname + "/public",//打包后存放文件的地方
		filename:"js/bundle-[hash].js"//输出文件
	},
	devServer:{//本地服务器
		contentBase:"./public",//本地服务器所加载的页面所在的目录
		port:'8000'
	},
	mode:'development',
	plugins:[
		new HtmlWebpackPlugin({
			title:'webpack hello',
			template:__dirname+"/src/tmpl/index.tmpl.html",
			filename:"index.html",
			date:new Date()
		}),
		new CleanWebpackPlugin('public.*',{
			verbose:true,//将log写道console中
			dry:false,//不要删除任何东西，用于测试
			exclude:['']//派出不删除的目录，避免删除公共文件
		})
	]
}
