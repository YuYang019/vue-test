
```vue
<template>
    <div id="window-test">
        <p>window 上一些全局方法的测试，方法包括：</p>
        <ul>
            <li>window.open</li>
            <li>localStorage</li>
            <li>window.alert</li>
            <li>定时器</li>
        </ul>

        <el-card class="card">
            <div slot="header">
                <span>window.open 打开百度</span>
            </div>
            <div class="content">
                <el-button
                    type="primary"
                    class="btn"
                    @click="handleClick"
                >window.open</el-button>
            </div>
        </el-card>

        <el-card class="card">
            <div slot="header">
                <span>输入文本，点击按钮存入localStorage</span>
            </div>
            <div class="content">
                <el-input class="input" v-model="text"></el-input>
                <el-button
                    type="primary"
                    class="btn2"
                    @click="handleClick2"
                >存入localStorage</el-button>
            </div>
        </el-card>

        <el-card class="card">
            <div slot="header">
                <span>定时器 + alert</span>
            </div>
            <div class="content">
                <el-button
                    type="primary"
                    class="btn3"
                    @click="handleClick3"
                >点击，3s 后 alert</el-button>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
        };
    },
    methods: {
        handleClick() {
            window.open('http://www.baidu.com');
        },
        handleClick2() {
            const storage = window.localStorage;
            storage.setItem('test', this.text);
        },
        handleClick3() {
            setTimeout(() => {
                window.alert('hello world');
            }, 3000);
        },
    },
};
</script>

<style lang="less" scoped>
#window-test {
    text-align: left;
    width: 80%;
    margin: 15px auto;
    .btn2 {
        margin-top: 15px;
    }
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
import WindowTest from '@/views/WindowTest.vue';

// 创建一个临时 Vue 实例，用于安装插件，挂载的时候传入，防止污染
const localVue = createLocalVue();

localVue.use(ElementUI);

describe('window 全局方法测试', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(WindowTest, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('点击按钮，触发 open 方法', () => {
        // mock 掉 open
        const mockedOpen = jest.fn();
        const originalOpen = window.open;
        window.open = mockedOpen;

        // 输入后，触发点击事件
        wrapper.find('.btn').trigger('click');

        expect(mockedOpen).toBeCalled();
        expect(mockedOpen).toBeCalledTimes(1);
        // open 被调用时，应该被传入一个参数
        expect(mockedOpen).toBeCalledWith('http://www.baidu.com');

        // 还原
        window.open = originalOpen;
    });

    it('输入文本，点击按钮存入 localStorage', async () => {
        const mockedSetItem = jest.fn();
        const original = window.localStorage;

        // localStorage 和 open 处理方法稍有不同，需要先完全删除掉默认的实现
        delete window.localStorage;
        window.localStorage = {
            setItem: mockedSetItem,
        };

        // 需要找到 input 节点才能调用 setValue 方法
        wrapper.find('.input input').setValue('hello world');
        // 输入后，触发点击事件
        wrapper.find('.btn2').trigger('click');

        expect(mockedSetItem).toBeCalled();
        expect(mockedSetItem).toBeCalledTimes(1);
        // setItem 被调用时，应该传入两个参数
        expect(mockedSetItem).toBeCalledWith('test', 'hello world');

        // 复原
        window.localStorage = original;
    });

    // 定时器相关 mock 方法可以参考：https://jestjs.io/docs/en/timer-mocks
    it('点击按钮，3s后调用 alert', () => {
        const mockedAlert = jest.fn();
        const originalAlert = window.alert;
        window.alert = mockedAlert;

        // 使用 mock 的定时器
        jest.useFakeTimers();

        wrapper.find('.btn3').trigger('click');

        // 快进 mock 的定时器，使其马上被调用
        jest.runAllTimers();

        expect(mockedAlert).toBeCalled();
        expect(mockedAlert).toBeCalledWith('hello world');

        // 复原定时器和 alert
        jest.useRealTimers();
        window.alert = originalAlert;
    });
});

```

####

