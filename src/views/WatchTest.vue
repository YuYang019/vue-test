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
