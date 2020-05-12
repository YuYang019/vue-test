
```vue
<template>
    <div id="eventhub-test">
        <p>模拟 EventHub 的测试，具体请看代码</p>

        <el-card class="card">
            <div class="content">
                <el-button class="btn" @click="emit" type="primary">发送事件</el-button>
                <p class="msg">{{ msg }}</p>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
        };
    },
    created() {
        this.$hub.$on('message', (data) => {
            this.msg = data;
        });
    },
    methods: {
        emit() {
            this.$hub.$emit('message', 'send message');
        },
    },
};
</script>

<style lang="less" scoped>
#eventhub-test {
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
import EventHubTest from '@/views/EventHubTest.vue';
import EventHub from '@/plugins/eventHub';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);
localVue.use(EventHub);

describe('EventHub 测试', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(EventHubTest, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('点击按钮时，emit方法应该被触发', () => {
        const mockFn = jest.fn();
        wrapper.setMethods({ emit: mockFn });
        wrapper.find('.btn').trigger('click');
        // 期望被触发一次
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(1);
    });

    it('emit方法被调用后，$emit被触发', () => {
        // mock 插件注入的 $hub 属性
        const mockedEmit = jest.fn();
        wrapper.vm.$hub = {
            $emit: mockedEmit,
        };

        wrapper.find('.btn').trigger('click');

        expect(mockedEmit).toBeCalled();
        expect(mockedEmit).toBeCalledWith('message', 'send message');
    });

    it('emit触发后，事件应该被监听处理', () => {
        // click 后，msg 属性被正确更新
        wrapper.find('.btn').trigger('click');
        expect(wrapper.vm.msg).toBe('send message');
        // 文本被渲染
        expect(wrapper.find('.msg').text()).toBe('send message');

        // 测试 $on 能否正确监听
        wrapper.vm.$hub.$emit('message', 'hello world');
        // 属性正确改变
        expect(wrapper.vm.msg).toBe('hello world');
        // 文本正确渲染
        expect(wrapper.find('.msg').text()).toBe('hello world');
    });
});

```

####


```@/plugins/eventHub.js
import _Vue from 'vue';

const hub = new _Vue({});

export default (Vue) => {
    Vue.prototype.$hub = hub;
};

```

####

