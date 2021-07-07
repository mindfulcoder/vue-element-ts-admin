import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from "../views/Home.vue";

export const static_routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
        meta: {
            hidden: true,
        }
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta:{
            hidden: true
        },
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    icon:'el-icon-s-home',
                },
                component: () => import ("../views/Dashboard.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格',
                    icon:'el-icon-s-grid'
                },
                component: () => import ("../views/BaseTable.vue")
            },
            {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表',
                    icon:'el-icon-s-data'
                },
                component: () => import ("../views/BaseCharts.vue")
            },
            {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单',
                    icon:'el-icon-goods'
                },
                component: () => import ("../views/BaseForm.vue")
            },
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签',
                    icon:'el-icon-goods'

                },
                component: () => import ("../views/Tabs.vue")
            },
            {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者',
                    icon:'el-icon-goods'

                },
                component: () => import ("../views/Donate.vue")
            },
            {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    access: ['admin'],
                    icon:'el-icon-goods'

                },
                component: () => import ("../views/Permission.vue")
            },
            {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言',
                    icon:'el-icon-goods'
                },
                component: () => import ("../views/I18n.vue")
            },
            {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件',
                    icon:'el-icon-goods'

                },
                component: () => import ( "../views/Upload.vue")
            },
            {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标',
                    icon:'el-icon-goods'

                },
                component: () => import ("../views/Icon.vue")
            },
            {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面',
                    icon:'el-icon-goods'

                },
                component: () => import ('../views/404.vue')
            },
            {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限',
                    icon:'el-icon-goods'
                },
                component: () => import ('../views/403.vue')
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                    icon:'el-icon-goods'

                },
                component: () => import ('../views/User.vue')
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    icon:'el-icon-goods'

                },
                component: () => import ('../views/Editor.vue')
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录',
            hidden: true
        },
        component: () => import ( "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: static_routes
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
