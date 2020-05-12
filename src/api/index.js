import axios from 'axios';

export default {
    query(params) {
        return axios.get('/query', params);
    },
};
