export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type ApiTodo = Omit<Todo, 'id'>

export interface ApiTodos {
  [id: string]: ApiTodo;
}

export interface TodoMutation {
  title: string;
}
