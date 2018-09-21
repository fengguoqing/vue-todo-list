<template>
  <!-- 菜单容器 -->
  <div class="list-todos">
    <!-- 单个菜单容器 -->
    <a @click="goList(item.id)" class="list-todo activeListClass list" :class="{'active' :item.id===todoId}" v-for="item in items" :key="item.key">
      <!-- 锁的图标 -->
      <span class="icon-lock" v-if="item.locked"></span>
      <!-- 菜单内待完成的项数量 -->
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.title}}
    </a>
    <!-- 新增菜单 -->
    <a class="link-list-new" @click="addTodoList">
      <span class="icon-plus"></span>
      新增
    </a>
  </div>
</template>

<script>
import { getTodoList, addTodo } from '../api/api';

export default {
  data() {
    return {
      items: [],
      todoId: '',
    };
  },
  created() {
    getTodoList({}).then((res) => {
      const TODOS = res.data.todos;
      this.items = TODOS;
      this.todoId = TODOS[0].id;
    });
  },
  methods: {
    goList(id) {
      this.todoId = id;
    },
    addTodoList() {
      addTodo({}).then((data) => {
        getTodoList({}).then((res) => {
          const TODOS = res.data.todos;
          this.items = TODOS;
          this.todoId = TODOS[TODOS.length - 1].id;
        });
      });
    },
  },

};
</script>

<style lang="less">
@import "../common/style/menu.less";
</style>

