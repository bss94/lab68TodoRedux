import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {fetchDeleteToDo, fetchToDos} from '../../../containers/ToDo/ToDoSlice';
import {AppDispatch} from '../../../app/store';
import {useDispatch} from 'react-redux';

interface Props{
  variant?:string;
  title:string;
  id:string;
}

const ToDoItem:React.FC<Props> = ({variant = "danger",title,id}) => {

  return (
    <Card border={variant}
          className="mt-3 border-2">

      <Card.Body>
        <Card.Text>
          {title}
        </Card.Text>
        {/*<input type={"checkbox"} checked={true}/> sdadasd*/}
        <Button>edit</Button>
        <Button >delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ToDoItem;