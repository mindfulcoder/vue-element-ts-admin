import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from "../views/Home.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录',
            visible: false,
        },
        component: () => import ("../views/Login.vue")
    },
    {
        path: '/',
        redirect: '/dashboard',
        meta: {
            title:'首页',
            index: 0
        }
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    index: 1,
                    title: '系统首页',
                    icon: 'el-icon-lx-home'
                },
                component: () => import ( "../views/Dashboard.vue")
            },
            {
                path: '/404',
                name: '404',
                meta: {
                    index: 2,
                    title: '找不到页面',
                    icon: 'el-icon-lx-warn'
                },
                component: () => import ('../views/404.vue')
            },
            {
                path: '/403',
                name: '403',
                meta: {
                    index: 3,
                    title: '没有权限',
                    icon: 'el-icon-lx-warn'
                },
                component: () => import ('../views/403.vue')
            }
        ]
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        role === 'admin' ? next() : next('/403');
    } else {
        next();
    }
});

export default router;
