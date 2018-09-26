import axios from 'axios';

export const getTodoList = params => axios.get('/todo/list', {
  params,
});

export const addTodo = params => axios.post('/todo/addTodo', params).then(res => res.data);

export const getTodo = params => axios.get('/todo/listId', {
  params,
});

export const addRecord = params => axios.post('/todo/addRecord', params).then(res => res.data);

export const editTodo = params => axios.post('/todo/editTodo', params).then(res => res.data);

export const editRecord = params => axios.post('/todo/editRecord', params).then(res => res.data);
