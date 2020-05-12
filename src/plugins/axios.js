/**
 * @file axios 处理
 * @author shy
 */

import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

const doAxios = options => new Promise((resolve, reject) => {
    if (options.method === 'post' && options.data) {
        options.data = qs.stringify(options.data);
    }
    if (options.method === 'get' || options.method === undefined) {
        if (options.data && !options.params) {
            options.params = options.data;
            delete options.data;
        }
    }
    instance.request(options).then((res) => {
        const { data } = res;
        if (res.status === 200 && +data.status === 0) {
            resolve(data);
        } else {
            reject(data);
        }
    }, (res) => {
        reject(res);
    });
});

export default {
    install(Vue) {
        Vue.prototype.$axios = doAxios;
    },
};
