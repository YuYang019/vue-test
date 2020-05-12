import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import axios from 'axios';
import AxiosTest from '@/views/AxiosTest.vue';
import AxiosPlugins from '@/plugins/axios';
import Api from '@/api';

import queryData from '../../../mock/query.json';

// mock 掉整个 axios, for case2 、case3
jest.mock('axios');

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，，防止污染
const localVue = createLocalVue();

// 组件使用了 element ，所以要注入
localVue.use(ElementUI);
// 测试 case1 ，注入 $axios
localVue.use(AxiosPlugins);

describe('Axios 测试', () => {
    let wrapper;

    beforeEach(() => {
        // 挂载
        wrapper = mount(AxiosTest, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    /**
     * case1: 插件形式封装 $axios 进行调用
     */

    it('case1 按钮被点击时，应该触发 sendRequest1', () => {
        // mock sendRequest1 方法
        const mockFn = jest.fn();
        wrapper.setMethods({ sendRequest1: mockFn });
        wrapper.find('.case1-btn').trigger('click');

        // 期望被触发一次
        // tips: toBeCalled 和 toBeCalledTimes 其实功能重复，被调用一次其实就是被调用了，这里主要为了展示用法
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
    });

    // 为了配合 axios 测试,需要在方法里 return 请求的 Promise,参见 AxiosTest 组件
    it('调用 sendRequest1 后，应该发起请求', () => {
        // mock 返回的数据
        const mockData = queryData;
        // mock 封装的 $axios 方法
        const mockedAxios = jest.fn();
        wrapper.vm.$axios = mockedAxios;

        // mock 整个 $axios 返回的值
        mockedAxios.mockResolvedValue(mockData);

        // 触发请求方法
        return wrapper.vm.sendRequest1().then((res) => {
            // list1 应该被正确的赋值
            expect(wrapper.vm.list1).toEqual(res.data);

            // $axios 被调用了一次
            expect(mockedAxios).toBeCalled();
            expect(mockedAxios).toBeCalledTimes(1);

            // 或者可以这样写，$axios 被调用了，且带着相关参数
            expect(mockedAxios).toBeCalledWith({
                url: '/query',
                methods: 'get',
                params: { id: 1 },
            });
        });
    });

    /**
     * case2: 直接引入调用
     */

    it('case2 按钮被点击时，触发 sendRequest2', () => {
        // mock sendRequest1 方法
        const mockFn = jest.fn();
        wrapper.setMethods({ sendRequest2: mockFn });
        wrapper.find('.case2-btn').trigger('click');

        // 期望被触发一次
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
    });

    it('调用 sendRequest2 后，应该发起请求', () => {
        // mock 返回的数据
        const mockData = { data: queryData };
        // mock get 方法
        axios.get.mockResolvedValue(mockData);
        // 触发请求方法
        return wrapper.vm.sendRequest2().then((res) => {
            // list1 应该被正确的赋值
            expect(wrapper.vm.list2).toEqual(res.data.data);

            // axios.get 被调用了一次
            expect(axios.get).toBeCalled();
            expect(axios.get).toBeCalledTimes(1);

            // 或者可以这样写，axios.get 被调用了，且带着相关参数
            expect(axios.get).toBeCalledWith('/query', { id: 2 });

            // 清除 mock
            axios.get.mockReset();
        });
    });

    /**
     * case3: 包装为Api层进行调用
     */

    it('case3 按钮被点击时，触发 sendRequest3', () => {
        // mock sendRequest1 方法
        const mockFn = jest.fn();
        wrapper.setMethods({ sendRequest3: mockFn });
        wrapper.find('.case3-btn').trigger('click');

        // 期望被触发一次
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
    });

    it('调用 sendRequest3 后，应该发起请求', () => {
        // 监听这个 Api.query 方法
        const spy = jest.spyOn(Api, 'query');
        // mock 返回的数据
        const mockData = { data: queryData };
        // mock get 方法
        axios.get.mockResolvedValue(mockData);
        // 触发请求方法
        return wrapper.vm.sendRequest3().then((res) => {
            // list1 应该被正确的赋值
            expect(wrapper.vm.list3).toEqual(res.data.data);

            // Api.query被调用
            expect(spy).toBeCalled();

            // axios.get 被调用了一次
            expect(axios.get).toBeCalled();
            expect(axios.get).toBeCalledTimes(1);

            // 或者可以这样写，axios.get 被调用了，且带着相关参数
            expect(axios.get).toBeCalledWith('/query', { id: 3 });

            // 重置监听和 mock
            spy.mockRestore();
            axios.get.mockReset();
        });
    });
});
