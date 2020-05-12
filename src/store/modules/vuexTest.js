import Api from '@/api';

export const types = {
    SET_LIST: 'SET_LIST',
};

const state = {
    list: [],
};

const getters = {
    validList: state => state.list.filter(item => item.isValid === 1),
};

const actions = {
    getList({ commit }, params) {
        return Api.query({ ...params }).then(res => res.data).then((res) => {
            commit(types.SET_LIST, res.data.slice());
        });
    },
};

const mutations = {
    [types.SET_LIST](state, payload) {
        state.list = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
