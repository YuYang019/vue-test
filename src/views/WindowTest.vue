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
