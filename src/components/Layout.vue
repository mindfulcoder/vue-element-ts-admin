<template>
  <div class="about">
    <Sidebar/>
    <Header/>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <Tags/>
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
import Header from "/@/components/Header.vue";
import Sidebar from "/@/components/Sidebar.vue";
import Tags from "/@/components/Tags.vue";

export default defineComponent({
  name:'Layout',
  components: {
    Header,
    Sidebar,
    Tags,
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
