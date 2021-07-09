import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Layout from "/@/components/Layout.vue";
import {getCurrentUser} from "/@/utils/user";

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
        component: Layout,
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
                component: () => import ("/@/views/Dashboard.vue")
            },
            {
                path: "/table",
                name: "table",
                meta: {
                    title: '表格',
                    icon: 'el-icon-s-grid'
                },
                component: () => import ("/@/views/BaseTable.vue")
            },
            {
                path: "/form",
                name: "form",
                meta: {
                    title: '表单',
                    icon: 'el-icon-goods'
                },
                component: () => import ("/@/views/BaseForm.vue")
            },
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签',
                    icon: 'el-icon-s-flag'

                },
                component: () => import ("/@/views/Tabs.vue")
            },
            {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言',
                    icon: 'el-icon-s-platform'
                },
                component: () => import ("/@/views/I18n.vue")
            },
            {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件',
                    icon: 'el-icon-top'

                },
                component: () => import ( "/@/views/Upload.vue")
            },
            {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面',
                    icon: 'el-icon-search'

                },
                component: () => import ('/@/views/404.vue')
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    icon: 'el-icon-document'

                },
                component: () => import ('/@/views/Editor.vue')
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
        component: () => import ( "/@/views/Login.vue")
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
