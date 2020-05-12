module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'https://front.bj.bcebos.com/test-example/'
        : '/',
    chainWebpack: (config) => {
        config
            .module
            .rule('md')
            .test(/\.md$/)
            .exclude
            .add(/node_modules/)
            .end()
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
    devServer: {
        before(app) {
            app.use(require('./server/mockServer'));
        },
    },
};
