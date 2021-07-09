<template>
  <template v-if="'children' in menu">
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
<script lang="ts">
import {defineComponent} from "vue";
import Submenu from "/@/components/Submenu.vue";

export default defineComponent({
  name: "Menu",
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  components: {
    Submenu
  }
})
</script>

<style scoped>

</style>
