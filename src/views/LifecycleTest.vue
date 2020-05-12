<template>
    <div id="lifecycle-test">
        <p>模拟 生命周期 的测试，具体请看代码</p>

        <el-card class="card">
            <div slot="header">
                <span>测试的生命周期包括：</span>
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in lifecycles" :key="item">{{ item }}</li>
                </ul>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            lifecycles: [
                'beforeCreate',
                'created',
                'beforeMount',
                'mounted',
                'beforeUpdate',
                'updated',
                'beforeDestroy',
                'destroyed',
            ],
        };
    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('destroyed');
    },
};
</script>

<style lang="less" scoped>
#lifecycle-test {
    text-align: left;
    width: 80%;
    margin: 15px auto;
    .card {
        margin: 15px 0;
    }
}
</style>
