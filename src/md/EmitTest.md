
```vue
<template>
    <div id="emit-test">
        <p>模拟 $emit 的测试，具体请看代码</p>

        <el-card class="card">
            <div class="content">
                <el-button class="btn" @click="emit" type="primary">向上emit事件</el-button>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    methods: {
        emit() {
            this.$emit('message', 'send message from EmitTest.vue');
        },
    },
};
</script>

<style lang="less" scoped>
#emit-test {
    text-align: left;
    width: 80%;
    margin: 15px auto;
    .content {
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

```

####

