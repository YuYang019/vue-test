const { resolve } = require('path');

/**
 * 这里配置自定义的 tab 选项
 */
module.exports = {
    VuexTest: {
        '@/store/modules/vuexTest.js': resolve(__dirname, '../src/store/modules/vuexTest.js'),
    },
    AxiosTest: {
        '@/api/index.js': resolve(__dirname, '../src/api/index.js'),
    },
    EventHubTest: {
        '@/plugins/eventHub.js': resolve(__dirname, '../src/plugins/eventHub.js'),
    },
    MyButtonTest: {
        '@/components/MyButton.vue': resolve(__dirname, '../src/components/MyButton.vue'),
    },
};
