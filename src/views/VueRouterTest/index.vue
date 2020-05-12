<template>
    <div id="vue-router-test">
        <p>模拟 vue-router 的测试，具体请看代码</p>

        <el-card class="card">
            <div slot="header">
                <span>当前路由信息：</span>
            </div>
            <div class="content">
                <pre class="route">{{ this.$route.path }}</pre>
            </div>
        </el-card>

        <el-card class="card">
            <div slot="header">
                <span>切换子路由：</span>
                <el-button class="btn-a" @click="goA">去往A组件</el-button>
                <el-button class="btn-b" type="primary" @click="goB">去往B组件</el-button>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    methods: {
        goA() {
            this.$router.push({ path: '/vue-router-test/a' });
        },
        goB() {
            this.$router.push({ path: '/vue-router-test/b' });
        },
    },
};
</script>

<style lang="less" scoped>
#vue-router-test {
    text-align: left;
    width: 80%;
    margin: 15px auto;
    .content {
        display: flex;
        justify-content: space-around;
        line-height: 40px;
    };
    .card {
        margin: 15px 0;
    };
}
</style>
