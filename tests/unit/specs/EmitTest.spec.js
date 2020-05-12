import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import EmitTest from '@/views/EmitTest.vue';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);

describe('Emit 测试', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(EmitTest, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('点击按钮时，emit应该被触发', () => {
        const mockFn = jest.fn();
        wrapper.setMethods({ emit: mockFn });
        wrapper.find('.btn').trigger('click');
        // 期望被触发一次
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
    });

    it('$emit 应该正确的派发事件', () => {
        wrapper.vm.emit();
        // 派发了 message 事件
        expect(wrapper.emitted().message[0]).toEqual(['send message from EmitTest.vue']);
    });
});
