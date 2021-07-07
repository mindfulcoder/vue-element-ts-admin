import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from "../views/Home.vue";
import {getCurrentUser} from "../utils/user";

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
        meta: {
            hidden: true
        },
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    icon: 'el-icon-s-home',
                },
                component: () => import ("../views/Dashboard.vue")
            },
            {
                path: "/table",
                name: "table",
                meta: {
                    title: '表格',
                    icon: 'el-icon-s-grid'
                },
                component: () => import ("../views/BaseTable.vue")
            },
            {
                path: "/charts",
                name: "charts",
                meta: {
                    title: '图表',
                    icon: 'el-icon-s-data'
                },
                component: () => import ("../views/BaseCharts.vue")
            },
            {
                path: "/form",
                name: "form",
                meta: {
                    title: '表单',
                    icon: 'el-icon-goods'
                },
                component: () => import ("../views/BaseForm.vue")
            },
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签',
                    icon: 'el-icon-goods'

                },
                component: () => import ("../views/Tabs.vue")
            },
            {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    access: ['admin'],
                    icon: 'el-icon-goods'

                },
                component: () => import ("../views/Permission.vue")
            },
            {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言',
                    icon: 'el-icon-goods'
                },
                component: () => import ("../views/I18n.vue")
            },
            {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件',
                    icon: 'el-icon-goods'

                },
                component: () => import ( "../views/Upload.vue")
            },
            {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标',
                    icon: 'el-icon-goods'

                },
                component: () => import ("../views/Icon.vue")
            },
            {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面',
                    icon: 'el-icon-goods'

                },
                component: () => import ('../views/404.vue')
            },
            {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限',
                    icon: 'el-icon-goods'
                },
                component: () => import ('../views/403.vue')
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    icon: 'el-icon-goods'

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
    const user = getCurrentUser()
    if (!user && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

export default router;
