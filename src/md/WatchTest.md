
```vue
<template>
    <div id="watch-test">
        <p>模拟 watch 的测试，具体请看代码</p>

        <el-card class="card">
            <div class="content">
                <div class="msg" v-show="visible">{{ msg }}</div>
                <el-button type="primary" class="btn" @click="handleClick">切换显示</el-button>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'hello world',
            visible: false,
        };
    },
    methods: {
        handleClick() {
            this.visible = !this.visible;
        },
    },
    watch: {
        visible() {
            console.log(this.visible);
        },
    },
};
</script>

<style lang="less" scoped>
#watch-test {
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
import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import WatchTest from '@/views/WatchTest.vue';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);

describe('Watch 测试', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(WatchTest, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('watch test', () => {
        const spy = jest.spyOn(console, 'log');

        wrapper.find('.btn').trigger('click');
        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        // 文本可见
        expect(wrapper.find('.msg').isVisible()).toBe(true);

        wrapper.vm.visible = 'hello world';
        // 改变 value 时，console 的传参也应该改变
        expect(spy).toBeCalledWith('hello world');

        spy.mockRestore();
    });
});

```

####

