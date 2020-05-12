import { shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import FilterTest from '@/views/FilterTest.vue';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);

describe('Filter 测试', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(FilterTest, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('正确的渲染文本', () => {
        expect(wrapper.find('.before').text()).toBe('原字符: abcd');
        expect(wrapper.find('.after').text()).toBe('filter 后字符: ABCD');
    });

    it('Filter test', () => {
        // 测试每一种可能
        expect(FilterTest.filters.upperCase('abcd')).toBe('ABCD');
        expect(FilterTest.filters.upperCase('12345')).toBe('12345');
        expect(FilterTest.filters.upperCase(1234)).toBe('');
        expect(FilterTest.filters.upperCase(null)).toBe('');
        expect(FilterTest.filters.upperCase(undefined)).toBe('');
        expect(FilterTest.filters.upperCase()).toBe('');
    });
});
