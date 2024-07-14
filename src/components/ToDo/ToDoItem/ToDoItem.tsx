import React from 'react';
import {Button, Card} from 'react-bootstrap';

interface Props{
  variant?:string;
}

const ToDoItem:React.FC<Props> = ({variant = "danger"}) => {
  return (
    <Card border={variant}
          className="mt-3 border-2">

      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <input type={"checkbox"} checked={true}/> sdadasd
        <Button>edit</Button>
      </Card.Body>
    </Card>
  );
};

export default ToDoItem;