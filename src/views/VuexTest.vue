<template>
    <div id="vuex-test">
        <p>模拟 vuex 的测试，具体请看代码</p>

        <el-card class="card">
            <div slot="header">
                <span>调用 action</span>
                <el-button
                    class="send-btn"
                    type="primary"
                    @click="handleClick"
                >发起 action</el-button>
                <el-button
                    class="reset-btn"
                    @click="handleReset"
                >清空</el-button>
            </div>
            <p>state 数据</p>
            <pre class="state">{{ list }}</pre>
            <p>getters 数据</p>
            <pre class="getters">{{ validList }}</pre>
        </el-card>
    </div>

</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { types } from '@/store/modules/vuexTest';

const {
    mapState,
    mapActions,
    mapGetters,
    mapMutations,
} = createNamespacedHelpers('vuexTest');

export default {
    computed: {
        ...mapState({
            list: state => state.list,
        }),
        ...mapGetters([
            'validList',
        ]),
    },
    methods: {
        ...mapActions([
            'getList',
        ]),
        ...mapMutations({
            setList: types.SET_LIST,
        }),
        handleClick() {
            return this.getList({ id: 1 });
        },
        handleReset() {
            this.setList([]);
        },
    },
};
</script>

<style lang="less" scoped>
#vuex-test {
    text-align: left;
    width: 80%;
    margin: 15px auto;
    .content {
        display: flex;
        justify-content: space-around;
        line-height: 40px;
    }
    .send-btn {
        margin-left: 15px;
    }
    .card {
        margin: 15px 0;
    }
}
</style>
