import React from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';

const TodoList = () => {
  return (
    <>
      <h4 className="mt-4 mb-3">To Do List</h4>
      <ToDoItem variant={"success"}/>
      <ToDoItem variant={"dark"}/>
      <ToDoItem/>
    </>
  );
};

export default TodoList;