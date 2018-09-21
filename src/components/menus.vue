<template>
  <!-- 菜单容器 -->
  <div class="list-todos">
    <!-- 单个菜单容器 -->
    <a class="list-todo activeListClass list" v-for="item in items" :key="item.key">
      <!-- 锁的图标 -->
      <span class="icon-lock" v-if="item.locked"></span>
      <!-- 菜单内待完成的项数量 -->
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.title}}
    </a>
    <!-- 新增菜单 -->
    <a class="link-list-new">
      <span class="icon-plus"></span>
      新增
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{
        title: '星期一',
        count: 1,
        locked: true,
        key: 1,
      }, {
        title: '星期二',
        count: 2,
        locked: true,
        key: 2,
      }, {
        title: '星期三',
        count: 3,
        locked: false,
        key: 3,
      }],
    };
  },
};
</script>

<style lang="less">
@import "../common/style/menu.less";
</style>

