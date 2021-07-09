<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="route.path"
             :collapse="store.state.collapse"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <Menu v-for="menu in menuList" :menu="menu"/>
    </el-menu>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import Submenu from "/@/components/Submenu.vue";
import {static_routes} from "/@/router";
import {getMenuList} from "/@/utils/menu";
import {getCurrentUser} from "/@/utils/user";
import Menu from "/@/components/Menu.vue";

export default defineComponent({
  name: "Sidebar",
  components: {Menu, Submenu},
  setup() {
    const store = useStore();
    const route = useRoute();
    const menuList = getMenuList(static_routes, getCurrentUser().roles);
    return {
      menuList: menuList,
      route,
      store,
    };
  },
});
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
