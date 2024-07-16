import {configureStore} from "@reduxjs/toolkit";
import {toDosReducer} from '../containers/ToDo/ToDoSlice';


export const store = configureStore({
  reducer: {
    todos: toDosReducer,
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;