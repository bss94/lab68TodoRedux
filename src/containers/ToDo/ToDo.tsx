import React, {useEffect} from 'react';
import ToDoForm from '../../components/ToDoForm/ToDoForm';
import TodoList from '../../components/ToDo/ToDoList/TodoList';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {fetchToDos} from './ToDoSlice';
import {Spinner} from 'react-bootstrap';

const ToDo = () => {
  const todosValue = useSelector((state: RootState) => state.todos.value);
  const isLoading = useSelector((state: RootState) => state.todos.isLoading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToDos());
  }, [dispatch]);

  return (
    <>
      <ToDoForm/>
      {isLoading ? <Spinner/> : <TodoList todos={todosValue}/>}

    </>
  );
};

export default ToDo;