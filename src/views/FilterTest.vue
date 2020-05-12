<template>
    <div id="filter-test">
        <p>模拟 filters 的测试，具体请看代码</p>

        <el-card class="card">
            <div class="content">
                <span class="before"> 原字符: {{ text }} </span>
                <span class="after"> filter 后字符: {{ text | upperCase }} </span>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            text: 'abcd',
        };
    },
    filters: {
        upperCase(val) {
            return typeof val === 'string' ? val.toUpperCase() : '';
        },
    },
};
</script>

<style lang="less" scoped>
#filter-test {
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
