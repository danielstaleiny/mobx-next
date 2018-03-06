const webpack = require('webpack')

require('dotenv').config()

module.exports = {
    webpack: (config, { dev }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(process.env))
        return config
    }
}
