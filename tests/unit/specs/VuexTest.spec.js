import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import axios from 'axios';
import VuexTest from '@/views/VuexTest.vue';
import Api from '@/api';
import vuexTest, { types } from '@/store/modules/vuexTest';

import queryData from '../../../mock/query.json';

// mock axios, for test actions
jest.mock('axios');

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);
localVue.use(Vuex);

/**
 * 测试 Vuex 时，有两种写法：
 *  1. 使用 use 注入 Vuex 插件，模拟真实的使用场景
 *  2. 使用 mocks 加载选项，mock 掉全局 $store 等属性
 * 这里选用了第一种方案
 * 可以参考该章节：https://lmiller1990.github.io/vue-testing-handbook/zh-CN/vuex-in-components.html#%E6%B5%8B%E8%AF%95%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84-vuex-state-%E5%92%8C-getters
 */

/**
 * 本测试分为两部分
 * 第一部分：单独测试 vuex 的各函数，不需要 mount，因为就单纯是函数
 * 第二部分：结合组件，测试组件中的 vuex，需要 mount
 * 实际项目中，请酌情组合
 */

describe('Vuex 测试', () => {
    it('test mutations', () => {
        const list = [{ id: 1, name: 'test' }];
        const state = {
            list: [],
        };
        // 调用 mutations
        vuexTest.mutations[types.SET_LIST](state, list);
        // 期望相等
        expect(state.list).toEqual(list);
    });

    it('test getters', () => {
        const state = {
            list: [
                { id: 1, isValid: 1 },
                { id: 2, isValid: 0 },
            ],
        };
        // 调用 getters
        const validList = vuexTest.getters.validList(state);
        // 期望正确过滤
        expect(validList).toEqual([
            { id: 1, isValid: 1 },
        ]);
    });

    /**
     * actions 测试三个方面
     * 1. commit被触发
     * 2. payload 携带正确
     * 3. mutations 被正确的 commit
     */
    it('test actions', async () => {
        const spy = jest.spyOn(Api, 'query');
        const commit = jest.fn();
        const params = { id: 1 };
        const mockData = { data: queryData };

        axios.get.mockResolvedValue(mockData);

        await vuexTest.actions.getList({ commit }, params);

        expect(spy).toBeCalledWith(params);
        expect(axios.get).toBeCalledWith('/query', params);
        expect(commit).toBeCalledWith(types.SET_LIST, queryData.data);

        // 重置
        spy.mockRestore();
        axios.get.mockReset();
    });
});

describe('结合组件，测试 Vuex', () => {
    let wrapper;
    let store;
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                vuexTest,
            },
        });

        wrapper = mount(VuexTest, {
            localVue,
            store,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('点击按钮, 调用对应 action', async () => {
        // 组件里调用 this.getList(params) ，最终会走 dispatch('vuexTest/getList', params)
        // 所以我们 mock dispatch
        // 任何 action 都会触发 dispatch
        // 这可以确保真的触发了 vuex 的 action，而不是组件内部一个同名的 method
        store.dispatch = jest.fn();

        wrapper.find('.send-btn').trigger('click');

        // dispatch被触发，参数应该正确携带
        expect(store.dispatch).toBeCalledWith('vuexTest/getList', { id: 1 });
    });

    it('调用 action 后，数据被正确更新', async () => {
        const mockData = { data: queryData };
        // mock axios
        axios.get.mockResolvedValue(mockData);

        return wrapper.vm.handleClick().then(() => {
            // list 属性被更新
            expect(wrapper.vm.list).toEqual(queryData.data);
            axios.get.mockReset();
        });
    });

    it('点击清除, 调用对应 mutations', () => {
        const mutations = {
            [types.SET_LIST]: jest.fn(),
        };
        const mockVuexTest = {
            ...vuexTest,
            mutations,
        };
        // 重新构造 store，用 mock 的 mutations 覆盖原有的
        store = new Vuex.Store({
            modules: {
                vuexTest: mockVuexTest,
            },
        });
        // 重新挂载
        wrapper = mount(VuexTest, {
            localVue,
            store,
        });

        // 触发
        wrapper.find('.reset-btn').trigger('click');

        // mutations 总是被传入两个参数：state 和 payload
        expect(mutations[types.SET_LIST]).toBeCalledWith(mockVuexTest.state, []);
    });

    it('点击清除，数据被正确更新', () => {
        wrapper.find('.reset-btn').trigger('click');
        expect(wrapper.vm.list).toEqual([]);
    });
});
