import axios from 'axios';

export const getTodoList = params => axios.get('/todo/list', {
  params,
});

export const addTodo = params => axios.post('/todo/addTodo', params).then(res => res.data);
