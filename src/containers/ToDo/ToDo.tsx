import React from 'react';
import ToDoForm from '../../components/ToDoForm/ToDoForm';
import TodoList from '../../components/ToDo/ToDoList/TodoList';

const ToDo = () => {
  return (
    <>
     <ToDoForm/>
     <TodoList/>
    </>
  );
};

export default ToDo;