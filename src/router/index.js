import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/showcase/:type?/:id?',
            name: 'Showcase',
            component: () => import('@/views/Showcase.vue')
        },
        {
            name: 'Redirect',
            path: '/:catchAll(.*)',
            redirect: { name: 'Home' }
        }
    ]
});

export default router;
