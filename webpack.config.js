var webpack = require('webpack');

module.exports = {
    entry:{
        'home' : './src/js/entry.js'
    },
    // entry: ['babel-polyfill', './src/js/entry.js'],
    output:{
        path:'./assect/js/',
        filename: '[name].js',
        publicPath: 'http://localhost:8080/static/assect/js/'
    },
    module: {
        loaders:[
            {
                test: /\.css$/,loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,loader: 'style!css!less'
            },
            {
                test: /\.js$/, 
                loader: 'babel-loader',
                exclude:function(path){//匹配不希望处理文件的路径
                    var isNpmModule = !!path.match('node_modules');
                    return isNpmModule;
                }, 
                query:{
                    presets:['es2015','react',"stage-0"]
                }
            },
            {
                test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
            },
            {
                test: /\.jsx$/, loader: 'babel-loader!jsx-loader?harmony'
            }

        ]
    },
    devtool: 'source-map',
    resolve : {
        extensions : ['','.js','.jsx']
    }
}