const path = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic'
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader', // 要使用的loader
            options: {
              configFile: 'tsconfig.client.json' // 指定自定义的配置文件路径
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'manifest.json'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  mode: 'development',
  target: 'web'
}
