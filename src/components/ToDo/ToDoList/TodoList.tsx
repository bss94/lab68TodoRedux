import React from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import {Todo} from '../../../types';

interface Props {
  todos: Todo[];
}

const TodoList: React.FC<Props> = ({todos}) => {
  return (
    <>
      <h4 className="mt-4 mb-3">To Do List</h4>
      {todos.length === 0
        ?
        <h5>Now todo list is empty, please enter new todo</h5>
        :
        todos.map(el => {
          return <ToDoItem title={el.title} completed={el.completed} id={el.id} key={el.id}/>;
        })}
    </>
  );
};

export default TodoList;