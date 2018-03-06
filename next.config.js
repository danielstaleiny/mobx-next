const webpack = require('webpack')

require('dotenv').config()

module.exports = {
    webpack: (config, { dev }) => {
        if (!dev) {
            config.devtool = 'source-map'
        }
        config.plugins.push(new webpack.EnvironmentPlugin(process.env))
        return config
    }
}
