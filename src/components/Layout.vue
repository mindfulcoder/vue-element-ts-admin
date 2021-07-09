<template>
  <div class="about">
    <v-sidebar/>
    <v-header/>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component"/>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, computed} from "vue";
import {useStore} from "vuex";
import vHeader from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";

export default defineComponent({
  name:'Layout',
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const store = useStore();
    const tagsList = computed(() =>
        store.state.tagsList.map((item) => item.name)
    );
    const collapse = computed(() => store.state.collapse);
    return {
      tagsList,
      collapse,
    };
  },
});
</script>
