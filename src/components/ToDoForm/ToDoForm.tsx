import React, {useState} from 'react';
import {Button, Col, Form, Row, Spinner} from 'react-bootstrap';
import {ApiTodo, TodoMutation} from '../../types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {fetchAddToDo, fetchToDos, send} from '../../containers/ToDo/ToDoSlice';

const initial: TodoMutation = {title: ''};
const ToDoForm = () => {
  const [newTodo, setNewTodo] = useState<TodoMutation>(
    initial
  );
  const isSending = useSelector((state: RootState) => state.todos.isSending);
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
    dispatch(send());
    const postData: ApiTodo = {...newTodo, completed: false};
    await dispatch(fetchAddToDo(postData));
    await dispatch(fetchToDos());
    setNewTodo(initial);
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
          <Button variant="success"
                  type="submit"
                  disabled={isSending}
          >
            {isSending
              ? <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </>
              : 'Save'
            }
          </Button>
        </Col>
      </Row>


    </Form>
  );
};

export default ToDoForm;