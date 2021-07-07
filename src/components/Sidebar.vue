<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="route.path" :collapse="store.state.collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="menu in menuList">
        <template v-if="menu.children">
          <el-submenu :index="menu.index" :key="menu.index">
            <template #title>
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
            </template>
            <Submenu v-for="child in menu.children" :menu="child"/>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="menu.index" :key="menu.index">
            <i :class="menu.icon"></i>
            <template #title>{{ menu.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import Submenu from "./Submenu.vue";

export default {
  components: {Submenu},
  setup() {
    const menuList = [
      {
        icon: "el-icon-s-home",
        index: "/dashboard",
        title: "系统首页",
      },
      {
        icon: "el-icon-s-grid",
        index: "/table",
        title: "基础表格",
      },
      {
        icon: "el-icon-copy-document",
        index: "/tabs",
        title: "tab选项卡",
      },
      {
        icon: "el-icon-date",
        index: "3",
        title: "表单相关",
        children: [
          {
            index: "/form",
            title: "基本表单",
          },
          {
            index: "/upload",
            title: "文件上传",
          },
          {
            index: "4",
            title: "三级菜单",
            children: [
              {
                index: "/editor",
                title: "富文本编辑器",
              },
            ],
          },
        ],
      },
      {
        icon: "el-icon-picture",
        index: "/icon",
        title: "自定义图标",
      },
      {
        icon: "el-icon-pie-chart",
        index: "/charts",
        title: "schart图表",
      },
      {
        icon: "el-icon-info",
        index: "/i18n",
        title: "国际化功能",
      },
      {
        icon: "el-icon-warning",
        index: "7",
        title: "错误处理",
        children: [
          {
            index: "/permission",
            title: "权限测试",
          },
          {
            index: "/404",
            title: "404页面",
          },
        ],
      },
      {
        icon: "el-icon-sunny",
        index: "/donate",
        title: "支持作者",
      },
    ];
    const route = useRoute();
    const store = useStore();
    return {
      menuList: menuList,
      route,
      store,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
