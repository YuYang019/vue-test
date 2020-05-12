import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import VueRouterTest from '@/views/VueRouterTest/index.vue';
import VueRouterA from '@/views/VueRouterTest/A.vue';
import VueRouterB from '@/views/VueRouterTest/B.vue';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);
localVue.use(VueRouter);

// mock 掉子组件，避免子组件内部过于庞大，降低测试性能 （可选）
jest.mock('@/views/VueRouterTest/A.vue', () => ({
    name: 'VueRouterA',
    render: h => h('div'),
}));

jest.mock('@/views/VueRouterTest/B.vue', () => ({
    name: 'VueRouterB',
    render: h => h('div'),
}));

// 路由信息
const routes = [{
    path: '/vue-router-test',
    name: 'VueRouterTest',
    component: VueRouterTest,
    children: [
        { path: 'a', component: VueRouterA },
        { path: 'b', component: VueRouterB },
    ],
}];

/**
 * 测试 VueRouter 时，有两种写法：
 *  1. 使用 use 注入 VueRouter 插件，模拟真实的使用场景
 *  2. 使用 mocks 加载选项，mock 掉全局 $route , $router 等属性
 * 这里选用了第一种方案
 * 可以参考该章节：https://lmiller1990.github.io/vue-testing-handbook/zh-CN/vue-router.html#vue-router
 */


describe('VueRouter 测试', () => {
    let wrapper;

    beforeEach(() => {
        const router = new VueRouter({ routes });
        wrapper = mount(VueRouterTest, {
            localVue,
            router,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('路由信息 $route.path 被渲染', () => {
        // 变更路由
        wrapper.vm.$router.push('/test');
        // $route 信息也会更着变
        expect(wrapper.find('.route').text()).toBe('/test');
    });

    it('点击按钮A, 发起跳转到A组件', async () => {
        // 监听 push 方法
        const spy = jest.spyOn(wrapper.vm.$router, 'push');

        wrapper.find('.btn-a').trigger('click');

        expect(spy).toBeCalled();
        expect(spy).toBeCalledWith({ path: '/vue-router-test/a' });

        // 等待子组件渲染
        await wrapper.vm.$nextTick();
        // A 组件被渲染了
        expect(wrapper.find(VueRouterA).exists()).toBe(true);
        // $route 信息也会更着变
        expect(wrapper.find('.route').text()).toBe('/vue-router-test/a');

        spy.mockRestore();
    });

    it('点击按钮B, 发起跳转到B组件', async () => {
        // 监听 push 方法
        const spy = jest.spyOn(wrapper.vm.$router, 'push');

        wrapper.find('.btn-b').trigger('click');

        expect(spy).toBeCalled();
        expect(spy).toBeCalledWith({ path: '/vue-router-test/b' });

        // 等待子组件渲染
        await wrapper.vm.$nextTick();
        // B 组件被渲染了
        expect(wrapper.find(VueRouterB).exists()).toBe(true);
        // $route 信息也会更着变
        expect(wrapper.find('.route').text()).toBe('/vue-router-test/b');

        spy.mockRestore();
    });
});
