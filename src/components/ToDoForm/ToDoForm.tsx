import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {TodoMutation} from '../../types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';


const ToDoForm = () => {
  const [newTodo,setNewTodo]=useState<TodoMutation>(
    {
      title:'',
      completed:false,
    }
  );
  const dispatch:AppDispatch =useDispatch();

  const onFieldChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = event.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }




  return (
    <Form className="mt-5 d-flex align-items-center justify-content-between"

    >
      <Form.Group className="w-100 mx-1" controlId="formToDo">
        <Form.Control type="text"
                      value={newTodo.title}
                      name="title"
                      onChange={onFieldChange}
                      placeholder="Enter new To Do"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default ToDoForm;