
```vue
<template>
    <div id="emit-test">
        <p>自定义按钮组件的测试，具体内容请查看代码</p>
        <p>功能较为简单，主要为了演示，功能包括：</p>
        <ul>
            <li>size属性控制大小</li>
            <li>disabled属性控制可用</li>
            <li>点击事件</li>
            <li>默认插槽/具名插槽/作用域插槽</li>
        </ul>

        <el-card class="card">
            <div slot="header">
                <span>size属性: small, medium, large。默认为 medium </span>
            </div>
            <div class="content">
                <div>
                    <my-button size="small">small</my-button>
                </div>
                <div>
                    <my-button @click="handleClick">medium</my-button>
                </div>
                <div>
                    <my-button size="large">large</my-button>
                </div>
            </div>
        </el-card>

         <el-card class="card">
            <div slot="header">
                <span>disabled属性</span>
            </div>
            <div class="content">
                <my-button disabled>Disabled</my-button>
            </div>
        </el-card>

         <el-card class="card">
            <div slot="header">
                <span>能够响应点击事件，请查看控制台 console </span>
            </div>
            <div class="content">
                <my-button @click="handleClick">我是自定义的按钮组件</my-button>
            </div>
        </el-card>

         <el-card class="card">
            <div slot="header">
                <span>默认插槽/具名插槽/作用域插槽</span>
            </div>
            <div class="content">
                <div>
                    <my-button>hello world</my-button>
                </div>
                <div>
                    <my-button>
                        <template v-slot:foo>
                            <span>具名插槽foo</span>
                        </template>
                    </my-button>
                </div>
                <div>
                    <my-button>
                        <template v-slot:bar="slotProps">
                            <span>{{ slotProps.user.name }}</span>
                        </template>
                    </my-button>
                </div>
            </div>
        </el-card>

    </div>
</template>

<script>
import MyButton from '@/components/MyButton.vue';

export default {
    components: {
        MyButton,
    },
    methods: {
        handleClick() {
            console.log('clicked');
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
        text-align: center;
        button {
            margin: 15px 0;
        }
    }
    .card {
        margin: 15px 0;
    }
}
</style>

```

####


```spec
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

```

####


```@/components/MyButton.vue
<template>
    <button class="my-btn" :disabled="disabled" @click="handleClick" :class="classes">
        <!-- 默认插槽 -->
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name="foo"></slot>
        <!-- 作用域插槽 -->
        <slot name="bar" :user="user"></slot>
    </button>
</template>

<script>
export default {
    name: 'MyButton',
    props: {
        size: {
            type: String,
            default: 'medium',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            user: {
                name: 'Tony',
            },
        };
    },
    computed: {
        classes() {
            return {
                disabled: this.disabled,
                [this.sizeClasses]: true,
            };
        },
        sizeClasses() {
            const size = ['small', 'medium', 'large'];
            let finalSize;
            if (size.indexOf(this.size) === -1) {
                finalSize = 'medium';
            } else {
                finalSize = this.size;
            }
            return `size--${finalSize}`;
        },
    },
    methods: {
        handleClick(e) {
            this.$emit('click', e);
        },
    },

};
</script>

<style lang="less" scoped>
    .my-btn {
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ccc;
        color: #333;
        padding: 0 20px;
        outline: none;
        transition: all .1s ease;

        &.disabled {
            cursor: not-allowed;
            background: rgba(0, 0, 0, 0.1)
        }

        &:active {
            border-color: #409EFF;
        }

        &.size--small {
            font-size: 12px;
            height: 24px;
            line-height: 24px;
        }
        &.size--medium {
            font-size: 13px;
            height: 32px;
            line-height: 32px;
        }
        &.size--large {
            height: 40px;
            font-size: 14px;
            line-height: 40px;
        }
    }
</style>

```

####

