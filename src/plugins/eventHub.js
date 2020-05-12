import _Vue from 'vue';

const hub = new _Vue({});

export default (Vue) => {
    Vue.prototype.$hub = hub;
};
