<template>
  <section class="container" :class="{'menu-open': menuOpen}">
    <section class="menu">
      <!-- 菜单容器组件 -->
      <menus></menus>
    </section>
    <!-- 这个是当页面收缩覆盖在内容上面的模糊层，点击后复原 他可以直接调用vuex actions.js里面的updateMenu方法-->
    <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>
    <!-- 右边的容器 -->
    <section class="content-container">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import menus from './menus';
import todo from './todo';

export default {
  components: {
    menus,
    todo,
  },
  computed: {
    menuOpen() {
      return this.$store.state.menuOpen;
    },
  },
};
</script>

<style lang="less">
@import "../common/style/layouts.less";
</style>

