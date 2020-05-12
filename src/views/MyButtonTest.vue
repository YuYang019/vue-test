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
