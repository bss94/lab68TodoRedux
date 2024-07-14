import React from 'react';
import {Button, Form} from 'react-bootstrap';

const ToDoForm = () => {
  return (
    <Form className="mt-5 d-flex align-items-center justify-content-between">
      <Form.Group className="mb-3" controlId="formToDo">
        <Form.Label>New To Do</Form.Label>
        <Form.Control type="text" placeholder="Enter new To Do"/>

      </Form.Group>
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default ToDoForm;