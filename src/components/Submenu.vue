<template>
  <el-submenu v-if="menu.children" :index="menu.index" :key="menu.index">
    <template #title>{{ menu.title }}</template>
    <Submenu v-for="item in menu.children" :menu="item"/>
  </el-submenu>
  <el-menu-item v-else :index="menu.index" :key="menu.index">{{ menu.title }}</el-menu-item>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Submenu",
  props: {
    menu: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
