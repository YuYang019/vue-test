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
