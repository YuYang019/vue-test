import { createLocalVue, shallowMount } from '@vue/test-utils';
import MyButton from '@/components/MyButton.vue';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

describe('MyButton 测试', () => {
    it('测试 props 默认值', () => {
        const wrapper = shallowMount(MyButton, {
            localVue,
        });
        // 属性正确
        expect(wrapper.props().size).toBe('medium');
        expect(wrapper.props().disabled).toBe(false);
        // 类名正确
        expect(wrapper.classes()).toContain('my-btn');
        expect(wrapper.classes()).toContain('size--medium');
        expect(wrapper.classes()).not.toContain('disabled');
        // 销毁
        wrapper.destroy();
    });

    it('测试 props 变化的情况', () => {
        const wrapper = shallowMount(MyButton, {
            localVue,
        });

        // 改变 size
        wrapper.setProps({ size: 'large' });
        // 类名正确
        expect(wrapper.classes()).toContain('size--large');

        // 改成未定义的 size
        wrapper.setProps({ size: 'test' });
        // 类名为 medium
        expect(wrapper.classes()).toContain('size--medium');

        // 改变 disabled
        wrapper.setProps({ disabled: true });
        // 类名正确
        expect(wrapper.classes()).toContain('disabled');

        // 销毁
        wrapper.destroy();
    });

    it('点击时, 应该触发 handleClick 方法', () => {
        const wrapper = shallowMount(MyButton, {
            localVue,
        });
        // mock 方法
        const mockFn = jest.fn();
        wrapper.setMethods({
            handleClick: mockFn,
        });
        // 触发点击
        wrapper.find('button').trigger('click');
        // 应该触发 handleClick 方法
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
        // 销毁
        wrapper.destroy();
    });

    it('点击后，应该派发 click 事件', () => {
        const wrapper = shallowMount(MyButton, {
            localVue,
        });
        // 测试 handleClick 方法
        const event = { test: true };
        wrapper.vm.handleClick(event);
        // 应该 emit 点击事件，且带着 event 参数
        expect(wrapper.emitted().click[0]).toEqual([event]);
        // 销毁
        wrapper.destroy();
    });

    it('测试默认插槽', () => {
        const wrapper = shallowMount(MyButton, {
            slots: {
                default: 'hello world',
            },
        });
        const button = wrapper.find('.my-btn');
        // 默认插槽文本正确
        expect(button.text()).toBe('hello world');

        wrapper.destroy();
    });

    it('测试具名插槽 foo', () => {
        const wrapper = shallowMount(MyButton, {
            slots: {
                foo: '<span class="foo">hello world</span>',
            },
        });
        const button = wrapper.find('.my-btn');
        // 自定义的 span 标签被渲染
        expect(button.find('.foo').exists()).toBe(true);
        // span 标签文本正确
        expect(button.find('.foo').text()).toBe('hello world');

        wrapper.destroy();
    });

    it('测试作用域插槽 bar', () => {
        const wrapper = shallowMount(MyButton, {
            scopedSlots: {
                bar: '<span class="bar" slot-scope="scope">{{ scope.user.name }}</span>',
            },
        });
        const button = wrapper.find('.my-btn');
        // 自定义的 span 标签被渲染
        expect(button.find('.bar').exists()).toBe(true);
        // 值渲染正确
        expect(button.find('.bar').text()).toBe('Tony');

        wrapper.destroy();
    });

    // 每次比较渲染的 DOM 结构，不一样则报错
    // 如果对 DOM 结构要求严格可以加 , 其实感觉比较鸡肋
    it('快照测试', () => {
        const wrapper = shallowMount(MyButton, {
            localVue,
        });
        expect(wrapper.html()).toMatchSnapshot();
        wrapper.destroy();
    });
});
