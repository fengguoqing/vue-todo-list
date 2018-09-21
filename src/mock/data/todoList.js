import Mock from 'mockjs';

let todoData = [];
const TODO_COUNT = Mock.Random.natural(1, 10);

for (let i = 1; i <= TODO_COUNT; i++) {
  todoData.push(Mock.mock({
    id: Mock.Random.guid(),
    title: Mock.Random.ctitle(),
    isDelete: false,
    locked: Mock.Random.boolean(),
    record: Mock.Random.range(Mock.Random.natural(1, 10)).map(
      () => ({
        text: Mock.Random.cparagraph(),
        isDelete: false,
        checked: Mock.Random.boolean(),
      })),
  }));
}

export {
  todoData,
};
