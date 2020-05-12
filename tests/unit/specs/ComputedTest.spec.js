import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import ComputedTest from '@/views/ComputedTest.vue';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);

describe('Computed 测试', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(ComputedTest, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('点击按钮时，add应该被触发', () => {
        const mockFn = jest.fn();
        wrapper.setMethods({ add: mockFn });
        wrapper.find('.btn').trigger('click');
        // 期望被触发一次
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
    });

    it('add被触发后，count的值 +1', () => {
        wrapper.find('.btn').trigger('click');
        expect(wrapper.vm.count).toBe(1);
        expect(wrapper.vm.doubleCount).toBe(2);
    });

    it('doubleCount 属性被正确计算', () => {
        wrapper.vm.count = 1;
        expect(wrapper.vm.doubleCount).toBe(2);

        wrapper.vm.count = 2;
        expect(wrapper.vm.doubleCount).toBe(4);

        wrapper.vm.count = 3;
        expect(wrapper.vm.doubleCount).toBe(6);
    });
});
