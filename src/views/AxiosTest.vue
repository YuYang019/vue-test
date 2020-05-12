<template>
    <div id="axios-test">
        <p>模拟 axios 的三种使用情形，具体请看代码</p>

        <el-card class="card">
            <div slot="header">
                <span>插件形式封装axios进行调用</span>
                <el-button
                    class="btn case1-btn"
                    type="text"
                    @click="sendRequest1"
                >发起请求</el-button>
            </div>
            <pre>{{list1}}</pre>
        </el-card>

        <el-card>
            <div slot="header">
                <span>直接引入调用</span>
                <el-button
                    class="btn case2-btn"
                    type="text"
                    @click="sendRequest2"
                >发起请求</el-button>
            </div>
            <pre>{{list2}}</pre>
        </el-card>

        <el-card>
            <div slot="header">
                <span>包装为Api层进行调用</span>
                <el-button
                    class="btn case3-btn"
                    type="text"
                    @click="sendRequest3"
                >发起请求</el-button>
            </div>
            <pre>{{list3}}</pre>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import Api from '@/api';

export default {
    data() {
        return {
            list1: {},
            list2: {},
            list3: {},
        };
    },
    methods: {
        // case1: 对 axios 进行了插件封装
        sendRequest1() {
            return this.$axios({
                url: '/query',
                methods: 'get',
                params: { id: 1 },
            }).then((res) => {
                this.list1 = res.data.slice();
                return res;
            });
        },
        // case2: 直接引入调用
        sendRequest2() {
            return axios.get('/query', { id: 2 }).then((res) => {
                this.list2 = res.data.data.slice();
                return res;
            });
        },
        // case3: 包装为Api层调用
        sendRequest3() {
            return Api.query({ id: 3 }).then((res) => {
                this.list3 = res.data.data.slice();
                return res;
            });
        },
    },
};
</script>

<style lang="less" scoped>
#axios-test {
    text-align: left;
    width: 80%;
    margin: 15px auto;
    .btn {
        float: right;
        padding: 3px 0;
    }
    .card {
        margin: 15px 0;
    }
}
</style>
