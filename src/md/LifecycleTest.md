
```vue
<template>
    <div id="lifecycle-test">
        <p>模拟 生命周期 的测试，具体请看代码</p>

        <el-card class="card">
            <div slot="header">
                <span>测试的生命周期包括：</span>
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in lifecycles" :key="item">{{ item }}</li>
                </ul>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            lifecycles: [
                'beforeCreate',
                'created',
                'beforeMount',
                'mounted',
                'beforeUpdate',
                'updated',
                'beforeDestroy',
                'destroyed',
            ],
        };
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('destroyed');
    },
};
</script>

<style lang="less" scoped>
#lifecycle-test {
    text-align: left;
    width: 80%;
    margin: 15px auto;
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

```

####

