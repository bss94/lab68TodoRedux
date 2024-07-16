import React, {useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {ApiTodo, TodoMutation} from '../../types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {fetchAddToDo, fetchToDos} from '../../containers/ToDo/ToDoSlice';

const initial: TodoMutation = {title: ''};
const ToDoForm = () => {
  const [newTodo, setNewTodo] = useState<TodoMutation>(
    {
      title: '',
      completed: false,
    }
  );
  const dispatch: AppDispatch = useDispatch();

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const postData: ApiTodo = {...newTodo, completed: false};
    await dispatch(fetchAddToDo(postData));
    await dispatch(fetchToDos());
  };


  return (
    <Form className="mt-5"
          onSubmit={onFormSubmit}
    >
      <Row>
        <Col sm={10}>
          <Form.Group controlId="formToDo">
            <Form.Control type="text"
                          value={newTodo.title}
                          name="title"
                          onChange={onFieldChange}
                          placeholder="Enter new To Do"/>
          </Form.Group>
        </Col>
        <Col className="text-end">
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Col>
      </Row>


    </Form>
  );
};

export default ToDoForm;