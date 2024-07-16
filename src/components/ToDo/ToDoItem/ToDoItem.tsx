import React from 'react';
import {Button, Card, Col, Form, Row, Spinner} from 'react-bootstrap';
import {fetchCompleteToDo, fetchDeleteToDo, fetchToDos} from '../../../containers/ToDo/ToDoSlice';
import {AppDispatch, RootState} from '../../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {ApiTodo} from '../../../types';

interface Props {
  title: string;
  id: string;
  completed: boolean;
}

const ToDoItem: React.FC<Props> = ({title, id, completed}) => {
  const dispatch: AppDispatch = useDispatch();
  const isDeleting = useSelector((state: RootState) => state.todos.isDeleting);

  const deleteTodo = async () => {
    await dispatch(fetchDeleteToDo(id));
    await dispatch(fetchToDos());
  };
  const completeTodo = async () => {
    const putData: ApiTodo = {
      title: title,
      completed: !completed
    };
    await dispatch(fetchCompleteToDo({id, putData}));
    await dispatch(fetchToDos());
  };
  return (
    <Card bg={completed ? 'success' : 'secondary'}
          text={'white'}
          className="mt-3 border-2">
      <Card.Body>
        <Row>
          <Col>
            <Form.Check checked={completed} onChange={completeTodo}/>
          </Col>
          <Col sm={9}>
            <Card.Text className="text-capitalize">
              {title}
            </Card.Text>
          </Col>
          <Col sm={2}>
            <Button className="btn-danger" onClick={deleteTodo} disabled={isDeleting}>
              {isDeleting
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
                : 'Delete'
              }
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ToDoItem;