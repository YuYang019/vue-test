import Vue from 'vue';
import VueRouter from 'vue-router';

import AxiosTest from '../views/AxiosTest.vue';
import ComputedTest from '../views/ComputedTest.vue';
import EventHubTest from '../views/EventHubTest.vue';
import FilterTest from '../views/FilterTest.vue';
import LifecycleTest from '../views/LifecycleTest.vue';
import EmitTest from '../views/EmitTest.vue';

import VueRouterTest from '../views/VueRouterTest/index.vue';
import VueRouterA from '../views/VueRouterTest/A.vue';
import VueRouterB from '../views/VueRouterTest/B.vue';

import VuexTest from '../views/VuexTest.vue';
import WatchTest from '../views/WatchTest.vue';
import MyButtonTest from '../views/MyButtonTest.vue';
import WindowTest from '../views/WindowTest.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/axios-test',
        name: 'AxiosTest',
        component: AxiosTest,
    },
    {
        path: '/computed-test',
        name: 'ComputedTest',
        component: ComputedTest,
    },
    {
        path: '/emit-test',
        name: 'EmitTest',
        component: EmitTest,
    },
    {
        path: '/eventhub-test',
        name: 'EventHubTest',
        component: EventHubTest,
    },
    {
        path: '/filter-test',
        name: 'FilterTest',
        component: FilterTest,
    },
    {
        path: '/lifecycle-test',
        name: 'LifecycleTest',
        component: LifecycleTest,
    },
    {
        path: '/vue-router-test',
        name: 'VueRouterTest',
        component: VueRouterTest,
        children: [
            { path: 'a', component: VueRouterA },
            { path: 'b', component: VueRouterB },
        ],
    },
    {
        path: '/vuex-test',
        name: 'VuexTest',
        component: VuexTest,
    },
    {
        path: '/watch-test',
        name: 'WatchTest',
        component: WatchTest,
    },
    {
        path: '/my-button-test',
        name: 'MyButtonTest',
        component: MyButtonTest,
    },
    {
        path: '/window-test',
        name: 'WindowTest',
        component: WindowTest,
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next('/axios-test');
    } else {
        next();
    }
});

export default router;
