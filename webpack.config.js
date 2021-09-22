// 引入一个包
const path = require('path')
// 下载安装并引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')

// 下载安装并引入clean插件，在每次run build之前可以清空/dist下面的旧文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack中所有配置信息都应该写在module.exports里
module.exports = {
    mode: "development",
    // 指定入口文件
    entry: "./src/index.ts",
    // 指定输出打包文件的目录和文件名
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        // 配置打包的环境
        environment: {
            arrowFunction: false,   // 告诉webpack不使用箭头函数
            const: false
        }
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定加载的规则
        rules: [
            {
                test: /\.ts$/,       // test指定的是规则生效的文件
                // use: 先转换ts to js，所以ts-loader在后面，再把新js 转换为旧 js
                use: [
                    // 配置babal
                    {
                        loader: "babel-loader",  //指定加载器
                        // 设置babel
                        options: {
                            // 设置预定义环境
                            presets: [
                                [ "@babel/preset-env" ,   //指定环境的插件
                                // 配置信息, 要兼容版本
                                {
                                    targets: {
                                        "chrome": "88",
                                        "ie": "11"
                                    },
                                    "corejs": "3",
                                    "useBuiltIns": "usage"  //使用corejs的方式为按需加载
                                }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node-modules/
            },
            // 配置less文件处理
            {
                test: /\.less$/,
                // use从下往上执行
                use: [
                    "style-loader",
                    "css-loader",
                    // 对象形式引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 配置webpack插件
    plugins: [
        // 注册clean插件
        new CleanWebpackPlugin(),
        // npm run build 时自动生成html文件并引入相关资源
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    // 设置哪些文件可以作为交叉引入模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}