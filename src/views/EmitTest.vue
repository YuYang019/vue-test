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
