<template>
    <div id="computed-test">
        <p>模拟 computed 的测试，具体请看代码</p>

        <el-card class="card">
            <div class="content">
                <span> 数字: {{ count }} </span>
                <span> 两倍数字: {{ doubleCount }} </span>
                <el-button class="btn" @click="add" type="primary">数字+1</el-button>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
        };
    },
    computed: {
        doubleCount() {
            return this.count * 2;
        },
    },
    methods: {
        add() {
            this.count += 1;
        },
    },
};
</script>

<style lang="less" scoped>
#computed-test {
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
