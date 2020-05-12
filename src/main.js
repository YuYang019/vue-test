import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from './plugins/axios';
import EventHub from './plugins/eventHub';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ElementUI);
Vue.use(Axios);
Vue.use(EventHub);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
