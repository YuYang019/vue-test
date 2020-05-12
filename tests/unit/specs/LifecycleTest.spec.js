import { shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import LifecycleTest from '@/views/LifecycleTest.vue';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);

describe('Lifecycle 测试', () => {
    // 测试思路：在 mount 前，mock 生命周期里会被调用的方法
    it('生命周期钩子被调用', () => {
        // 监听 console 方法
        const spy = jest.spyOn(console, 'log');
        // 挂载
        const wrapper = shallowMount(LifecycleTest, {
            localVue,
        });

        // 初始化时，console被调用了四次, 分别在四个生命周期
        expect(spy).toBeCalledWith('beforeCreate');
        expect(spy).toBeCalledWith('created');
        expect(spy).toBeCalledWith('beforeMount');
        expect(spy).toBeCalledWith('mounted');

        // 强制更新
        wrapper.vm.$forceUpdate();

        // 更新的钩子
        expect(spy).toBeCalledWith('beforeUpdate');
        expect(spy).toBeCalledWith('updated');

        // 销毁
        wrapper.vm.$destroy();

        // 销毁的钩子
        expect(spy).toBeCalledWith('beforeDestroy');
        expect(spy).toBeCalledWith('destroyed');

        spy.mockRestore();
    });
});
