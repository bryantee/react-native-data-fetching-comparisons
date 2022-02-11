const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

const rivetDist = path.resolve(__dirname, 'node_modules/@lessen/rivet-components/dist');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);
    // Customize the config before returning it.
    // config.module.rules.push({
    //     test: /\.(js)?$/,
    //     include: [
    //         path.resolve(rivetDist, 'atoms'),
    //         path.resolve(rivetDist, 'molecules'),
    //         path.resolve(rivetDist, 'organisms'),
    //         path.resolve(rivetDist, 'templates'),
    //         path.resolve(rivetDist, 'utils'),
    //         path.resolve(rivetDist, 'themes')],
    //     use: [{
    //         loader: 'babel-loader',
    //     }]
    // });

    return config;
};
