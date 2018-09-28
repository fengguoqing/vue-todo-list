<template>
  <!-- 最外层容器 -->
  <div class="page lists-show" v-show="!todo.isDelete">
    <!-- 容器上半部 -->
    <nav>
      <!-- 移动端的菜单图标 -->
      <div class="form list-edit-form" v-show="isUpdate">
        <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item" @click="isUpdate = false">
            <span class="icon-close"></span>
          </a>
        </div>
      </div>
      <!-- 在菜单的图标下面添加updateMenu时间，他可以直接调用vuex actions.js里面的updateMenu方法 -->
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <a class="nav-item">
          <span class="icon-list-unordered"></span>
        </a>
      </div>
      <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
        <!-- 标题 -->
        <span class="title-wrapper">{{todo.title}}</span>
        <!-- 数目 -->
        <span class="count-list">{{todo.count || 0}}</span>
      </h1>
      <!-- 右边删除，锁定图标容器 -->
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web">
          <!-- 锁定图标 -->
          <a class="nav-item" @click="onlock">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else></span>
          </a>
          <!-- 删除图标 -->
          <a class="nav-item">
            <span class="icon-trash" @click="onDelete"></span>
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
      <div v-for="(item, index) in items" :key="item.key">
        <item :item="item" :index="index" :id="todo.id" :init="init" :locked="todo.locked"></item>
      </div>
    </div>
  </div>
</template>

<script>
import item from './item';
import { getTodo, addRecord, editTodo } from '../api/api';

export default {
  data() {
    return {
      // 详情内容
      todo: {
        title: '',
        count: 0,
        locked: false,
      },
      // 代办单项
      items: [],
      text: '', // 新增代办单项绑定值
      isUpdate: false,
    };
  },
  methods: {
    onAdd() {
      // 当用户点击回车时候 ，给items的值新增一个对象，this.text 即输入框绑定的值
      const ID = this.$route.params.id;
      addRecord({ id: ID, text: this.text }).then((res) => {
        this.text = '';
        this.init();
      });
      this.items.push({
        checked: false, text: this.text, isDelete: false,
      });
      this.text = '';
    },
    init() {
      const ID = this.$route.params.id;
      getTodo({ id: ID }).then((res) => {
        const {
          id, title, count, isDelete, locked, record,
        } = res.data.todo;
        this.items = record;
        this.todo = {
          id, title, count, locked, isDelete,
        };
      });
    },
    updateTodo() {
      const that = this;
      editTodo({
        todo: this.todo,
      }).then((data) => {
        that.$store.dispatch('getTodo');
      });
    },
    updateTitle() {
      this.updateTodo();
      this.isUpdate = false;
    },
    onDelete() {
      this.todo.isDelete = true;
      this.updateTodo();
    },
    onlock() {
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    },
  },
  components: {
    item,
  },
  watch: {
    '$route.params.id': function () {
      this.init();
    },
  },
  created() {
    // this.init();
  },
};
</script>

<style lang="less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>
