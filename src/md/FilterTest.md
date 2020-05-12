
```vue
<template>
    <div id="filter-test">
        <p>模拟 filters 的测试，具体请看代码</p>

        <el-card class="card">
            <div class="content">
                <span class="before"> 原字符: {{ text }} </span>
                <span class="after"> filter 后字符: {{ text | upperCase }} </span>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            text: 'abcd',
        };
    },
    filters: {
        upperCase(val) {
            return typeof val === 'string' ? val.toUpperCase() : '';
        },
    },
};
</script>

<style lang="less" scoped>
#filter-test {
    text-align: left;
    width: 80%;
    margin: 15px auto;
    .content {
        display: flex;
        justify-content: space-around;
        line-height: 40px;
    }
    .card {
        margin: 15px 0;
    }
}
</style>

```

####


```spec
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

```

####

