import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import(/* webpackChunkName: "group-default" */ '@/views/Home.vue')
        },
        {
            path: '/showcase/:type?/:id?',
            name: 'Showcase',
            component: () => import(/* webpackChunkName: "group-default" */ '@/views/Showcase.vue')
        },
        {
            name: 'Redirect',
            redirect: { name: 'Home' }
        }
    ]
});

export default router;
