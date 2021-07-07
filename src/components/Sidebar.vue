<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="route.path" :collapse="store.state.collapse"
             background-color="#324157"
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
import {static_routes} from "../router";
import {getMenuList} from "../utils/menu";

export default {
  components: {Submenu},
  setup() {
    const menuList = getMenuList(static_routes, ['admin']);
    console.log(menuList)
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
  width: 200px;
}

.sidebar > ul {
  height: 100%;
}
</style>
