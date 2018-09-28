import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {
  todoData,
} from './data/todoList';

export default {
  start() {
    const mock = new MockAdapter(axios, {
      delayResponse: 100,
    });
    mock.onGet('/todo/list').reply((config) => {
      const mockTodo = todoData.map(tode => ({
        id: tode.id,
        title: tode.title,
        count: tode.record.filter((data) => {
          if (data.checked === false) return true;
          return false;
        }).length,
        locked: tode.locked,
        isDelete: tode.isDelete,
      })).filter((tode) => {
        if (tode.isDelete === true) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        resolve([200, {
          todos: mockTodo, // 返回状态为200，并且返回todos数据
        }]);
      });
    });

    mock.onGet('/todo/listId').reply((config) => {
      const {
        id,
      } = config.params;
      const todo = todoData.find(
        item => id && item.id === id,
      );

      if (todo) {
        todo.count = todo.record.filter(data => data.checked === false).length;
      }

      return new Promise((resolve, reject) => {
        resolve([200, {
          todo, // 返回状态为200，并且返回todo数据
        }]);
      });
    });

    mock.onPost('/todo/addTodo').reply((config) => {
      todoData.push({
        id: Mock.Random.guid(),
        title: '新的代办事项',
        isDelete: false,
        locked: false,
        record: [],
      });
      return new Promise((resolve, reject) => {
        resolve([200]);
      });
    });

    mock.onPost('/todo/addRecord').reply((config) => {
      const {
        id,
        text,
      } = JSON.parse(config.data);
      todoData.some((t) => {
        if (t.id === id) {
          t.record.push({
            text,
            isDelete: false,
            checked: false,
          });
          return true;
        }
        return false;
      });
      return new Promise((resolve, reject) => {
        resolve([200]);
      });
    });

    // 修改标题
    mock.onPost('/todo/editTodo').reply((config) => {
      const {
        todo,
      } = JSON.parse(config.data);
      todoData.some((t, index) => {
        if (t.id === todo.id) {
          t.title = todo.title;
          t.locked = todo.locked;
          t.isDelete = todo.isDelete;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        resolve([200]);
      });
    });

    // 修改记录
    mock.onPost('/todo/editRecord').reply((config) => {
      const {
        id,
        record,
        index,
      } = JSON.parse(config.data);
      todoData.some((t) => {
        if (t.id === id) {
          t.record[index] = record;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        resolve([200]);
      });
    });
  },
};
