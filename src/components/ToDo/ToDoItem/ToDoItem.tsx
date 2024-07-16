import React from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {fetchDeleteToDo, fetchToDos} from '../../../containers/ToDo/ToDoSlice';
import {AppDispatch} from '../../../app/store';
import {useDispatch} from 'react-redux';

interface Props {
  title: string;
  id: string;
  completed:boolean;
}

const ToDoItem: React.FC<Props> = ({title, id,completed}) => {
  const dispatch: AppDispatch = useDispatch();
  const deleteTodo = async () => {
    await dispatch(fetchDeleteToDo(id));
    await dispatch(fetchToDos());
  };
  return (
    <Card bg={completed?'success':'secondary'}
          text={'white'}
          className="mt-3 border-2">
      <Card.Body>
      <Row>
        <Col>
          <Form.Check checked={completed}/>
        </Col>
        <Col sm={9}>
            <Card.Text>
              {title}
            </Card.Text>
        </Col>
        <Col sm={2}>
          <Button className="btn-danger" onClick={deleteTodo}>delete</Button>
        </Col>
      </Row>
</Card.Body>
    </Card>
  );
};

export default ToDoItem;