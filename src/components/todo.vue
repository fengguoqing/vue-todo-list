<template>
  <!-- 最外层容器 -->
  <div class="page lists-show">
    <!-- 容器上半部 -->
    <nav>
      <!-- 移动端的菜单图标 -->
      <div class="nav-group">
        <a class="nav-item">
          <span class="icon-list-unordered"></span>
        </a>
      </div>
      <h1 class="title-page">
        <!-- 标题 -->
        <span class="title-wrapper">{{todo.title}}</span>
        <!-- 数目 -->
        <span class="count-list">{{todo.count}}</span>
      </h1>
      <!-- 右边删除，锁定图标容器 -->
      <div class="nav-group right">
        <div class="options-web">
          <!-- 锁定图标 -->
          <a class="nav-item">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else></span>
          </a>
          <!-- 删除图标 -->
          <a class="nav-item">
            <span class="icon-trash"></span>
          </a>
        </div>
      </div>
      <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，
      在todo.locked为true的情况下无法编辑-->
      <div class="form todo-new input-symbol">
        <input type="text" v-model="text" placeholder="请输入" @keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <!-- 容器的下半部 -->
      <!-- 这里`v-for`会循环我们在 `data`函数 事先定义好的 ’items‘模拟数据，
      循环后拿到单个对象，在通过prop把数据传输给子组件 item -->
      <div v-for="item in items" :key="item.key">
        <item :item="item"></item>
      </div>
    </div>
  </div>
</template>

<script>
import item from './item';

export default {
  data() {
    return {
      // 详情内容
      todo: {
        title: '星期一',
        count: 12,
        locked: false,
      },
      // 代办单项
      items: [
        { checked: false, text: '新的一天', isDelete: false, key: 1 },
        { checked: false, text: '新的一天', isDelete: false, key: 2 },
        { checked: false, text: '新的一天', isDelete: false, key: 3 },
      ],
      text: '', // 新增代办单项绑定值
    };
  },
  methods: {
    onAdd() {
      // 当用户点击回车时候 ，给items的值新增一个对象，this.text 即输入框绑定的值
      this.items.push({
        checked: false, text: this.text, isDelete: false,
      });
      this.text = '';
    },
  },
  components: {
    item,
  },
};
</script>

<style lang="less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>
